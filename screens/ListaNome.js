// Pesquisa a tabela de funcionários por argumentos diferentes
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, Alert } from 'react-native';
import * as SQLite from 'expo-sqlite';

export default function App() {
  const [db, setDb] = useState(null); // Estado para armazenar a conexão
  const [results, setResults] = useState([]); // Resultados da consulta
  const [searchText, setSearchText] = useState(''); // Texto da pesquisa
  const [status, setStatus] = useState('Inicializando...'); // Status da conexão

  // --- Inicializar o banco uma única vez ---
  useEffect(() => {
    async function setupDatabase() {
      try {
        const database = await SQLite.openDatabaseAsync('produtosBanco.db');
        setDb(database);

        // Criar tabela corrigida (SEM vírgula extra no último campo)
        await database.execAsync(`
          CREATE TABLE IF NOT EXISTS produtos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            preco REAL NOT NULL,
            imagem TEXT,
            descricao TEXT,
            estoque REAL NOT NULL,
            cor TEXT,
            categoria TEXT
          );
        `);

        setStatus('✅ Banco de dados e tabela prontos!');
      } catch (error) {
        console.error('Erro ao conectar ou criar tabela:', error);
        setStatus('❌ Erro ao inicializar o banco de dados');
        Alert.alert('Erro', 'Não foi possível conectar ao banco de dados.');
      }
    }

    setupDatabase();
  }, []);

  // --- Função genérica para executar consultas ---
  const executarConsulta = async (query, params = []) => {
    if (!db) {
      Alert.alert('Erro', 'O banco de dados não está pronto.');
      return;
    }

    try {
      const rows = await db.getAllAsync(query, params);
      setResults(rows);
      if (rows.length === 0) {
        Alert.alert('Aviso', 'Nenhum resultado encontrado.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Falha na consulta. Veja o console.');
      console.error('Erro na consulta:', error);
    }
  };

  // --- Pesquisar por nome ---
  const pesquisarNome = async () => {
    if (!searchText.trim()) {
      Alert.alert('Aviso', 'Digite o nome da peça para pesquisar.');
      return;
    }
    await executarConsulta('SELECT * FROM produtos WHERE nome LIKE ?;', [`%${searchText}%`]);
  };

  // --- Renderizar cada item da lista ---
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>ID: {item.id}</Text>
      <Text>Nome: {item.nome}</Text>
      <Text>Preço: R$ {item.preco}</Text>
      <Text>Cor: {item.cor}</Text>
      <Text>Categoria: {item.categoria}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pesquisar peças por nome</Text>
      <Text style={styles.statusText}>{status}</Text>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome da peça"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Pesquisar Nome" onPress={pesquisarNome} disabled={!db} />
      </View>

      <FlatList
        style={styles.list}
        data={results}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  statusText: {
    textAlign: 'center',
    marginBottom: 10,
    color: 'gray',
  },
  searchContainer: {
    flexDirection: 'column',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'column',
    gap: 10,
    marginBottom: 20,
  },
  list: {
    width: '100%',
  },
  item: {
    backgroundColor: '#fff',
    padding: 15,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    borderRadius: 5,
    marginBottom: 5,
  },
});
