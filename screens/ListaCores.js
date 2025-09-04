// Pesquisa a tabela de funcionários por argumentos diferentes
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, Alert } from 'react-native';
import * as SQLite from 'expo-sqlite';

export default function App() {
  const [db, setDb] = useState(null);       // Estado do banco
  const [results, setResults] = useState([]); // Resultados da consulta
  const [searchText, setSearchText] = useState(''); // Texto da pesquisa
  const [status, setStatus] = useState('Inicializando...'); // Status

  // --- Inicializar banco uma vez ---
  useEffect(() => {
    async function setupDatabase() {
      try {
        const database = await SQLite.openDatabaseAsync('produtosBanco.db');
        setDb(database);

        // Criar tabela corrigida (sem vírgula no final)
        await database.execAsync(`
          CREATE TABLE IF NOT EXISTS produtos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            preco REAL NOT NULL,
            imagem TEXT,
            descricao TEXT,
            estoque REAL NOT NULL,
            cor TEXT,
            categoria TEXT,
            tamanhos TEXT,
            modelo TEXT
          );
        `);

        setStatus('✅ Banco de dados e tabela prontos!');
      } catch (error) {
        console.error('Erro ao inicializar DB:', error);
        setStatus('❌ Falha ao inicializar o banco de dados');
      }
    }

    setupDatabase();
  }, []);

  // --- Função para consultas ---
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
      Alert.alert('Erro', 'Falha na consulta. Verifique o console.');
      console.error('Erro na consulta:', error);
    }
  };

  // --- Pesquisar por cor ---
  const pesquisarCor = async () => {
    if (!searchText.trim()) {
      Alert.alert('Aviso', 'Digite a cor da peça para pesquisar.');
      return;
    }
    await executarConsulta('SELECT * FROM produtos WHERE cor LIKE ?;', [`%${searchText}%`]);
  };

  // --- Renderizar item da lista ---
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>ID: {item.id}</Text>
      <Text>Nome: {item.nome}</Text>
      <Text>Cor: {item.cor}</Text>
      <Text>Preço: R$ {item.preco}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pesquisar peças por cor</Text>
      <Text style={styles.statusText}>{status}</Text>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite a cor"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Pesquisar Cor" onPress={pesquisarCor} disabled={!db} />
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
  },
});
