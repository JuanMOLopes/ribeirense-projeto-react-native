// Inserir Dados na Tabela com Imagem
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ScrollView, Image } from 'react-native';
import * as SQLite from 'expo-sqlite';

let db = null;

async function openDb() {
  if (db) return db;
  db = await SQLite.openDatabaseAsync('produtosBanco.db');
  return db;
}

export default function App() {
  const [nome, setNome] = useState('');
  const [cor, setCor] = useState('');
  const [tamanho, setTamanho] = useState('');
  const [modelo, setModelo] = useState('');
  const [preco, setPreco] = useState('');
  const [imagem, setImagem] = useState('');

  const Inserir = async () => {
    if (!nome.trim() || !cor.trim() || !tamanho.trim() || !preco.toString().trim() || !modelo.trim() || !imagem.trim()) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    try {
      const conn = await openDb();
      await conn.execAsync(
        'INSERT INTO produtos (nome, cor, tamanho, modelo, preco, imagem) VALUES (?, ?, ?, ?, ?, ?)',
        [nome, cor, tamanho, modelo, parseFloat(preco), imagem]
      );

      Alert.alert('Sucesso', 'Camiseta adicionada com sucesso!');
      setNome('');
      setCor('');
      setTamanho('');
      setModelo('');
      setPreco('');
      setImagem('');
    } catch (error) {
      Alert.alert('Erro', 'Falha ao adicionar nova camiseta.');
      console.error('Erro ao inserir:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Adicionar Nova Camiseta</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome da camiseta"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Preço"
        keyboardType="numeric"
        value={preco}
        onChangeText={setPreco}
      />
      <TextInput
        style={styles.input}
        placeholder="Tamanho"
        value={tamanho}
        onChangeText={setTamanho}
      />
      <TextInput
        style={styles.input}
        placeholder="Cor"
        value={cor}
        onChangeText={setCor}
      />
      <TextInput
        style={styles.input}
        placeholder="Modelo (F/M)"
        value={modelo}
        onChangeText={setModelo}
      />
      <TextInput
        style={styles.input}
        placeholder="URL da imagem"
        value={imagem}
        onChangeText={setImagem}
      />

      {imagem ? (
        <Image
          source={{ uri: imagem }}
          style={{ width: 200, height: 200, marginBottom: 10, borderRadius: 8 }}
          resizeMode="contain"
        />
      ) : null}

      <Button title="Adicionar Camiseta" onPress={Inserir} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});
