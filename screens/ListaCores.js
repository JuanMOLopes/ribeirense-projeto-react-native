// Pesquisa a tabela de funcionários por argumentos diferentes
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, Alert } from 'react-native';
import * as SQLite from 'expo-sqlite';

export default function App() {
  // Estado para armazenar a conexão com o banco de dados
  const [db, setDb] = useState(null);
  
  // Estado para armazenar os resultados da consulta
  const [results, setResults] = useState([]);
  
  // Estados para os campos de pesquisa
  const [searchText, setSearchText] = useState('');
  
  // Estado para a mensagem de status 
  const [status, setStatus] = useState('Inicializando...');

  // --- Efeito para inicializar o banco de dados uma única vez ---
  useEffect(() => {
    async function setupDatabase() {
      try {
        // Abrindo o banco de dados de forma segura
        const database = await SQLite.openDatabaseAsync('produos.db');
        
        // Armazenando a referência do banco de dados no estado
        setDb(database);
        
        // Opcional: Criar a tabela se ela ainda não existir
        await database.execAsync(`
          CREATE TABLE IF NOT EXISTS funcionarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            preco REAL NOT NULL,
            imagem  TEXT,
            descricao TEXT,
            estoque REAL NOT NULL,
            cor TEXT,
            categoria TEXT,
          );
        `);
        setStatus('✅ Banco de dados e tabela prontos!');

      } catch (error) {
        console.error('Erro ao conectar ou criar tabela:', error);
        setStatus('❌ Erro ao inicializar o banco de dados. Veja o log.');
        Alert.alert('Erro', 'Não foi possível conectar ao banco de dados.');
      }
    }
    // Chamando a função de setup
    setupDatabase();
  }, []); // O array vazio garante que isso rode apenas na primeira renderização

  // --- Função genérica para executar consultas ---
  const executarConsulta = async (query, params = []) => {
    // Acessando a conexão do estado e verificando se ela existe
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

// pesquisando funcionarios (cada select é para pesquisar uma informação diferente)


  const pesquisarNomeRoupa = async () => {
    if (!searchText.trim()) {
      Alert.alert('Aviso', 'Digite a cor da peça para pesquisar.');
      return;
    }
    // Usando LIKE e o parâmetro `?` para evitar SQL Injection 
    
    await executarConsulta('SELECT * FROM produtos WHERE cor LIKE ?;', [`%${searchText}%`]);
  };

  



  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>ID: {item.id}</Text>
      <Text>Cor: {item.cor}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pesquisar peças por cor</Text>
      <Text style={styles.statusText}>{status}</Text> {/* Exibindo o status da conexão */}

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Cor da peça"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
      
      <View style={styles.buttonContainer}>
        {/* Desabilitando os botões se a conexão não estiver pronta */}
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
  },
});