// Inserir Dados na Tabela com Imagem
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  ScrollView,
  Image,
} from 'react-native';
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
  const [estoque, setEstoque] = useState('');
  const [categoria, setCategoria] = useState('');
  const [descricao, setDescricao] = useState('');

  const precoFloat = parseFloat(preco);
  const estoqueFloat = parseFloat(estoque);

  const Inserir = async () => {
    if (
      !nome.trim() ||
      !imagem.trim() ||
      !cor.trim() ||
      isNaN(precoFloat) ||
      isNaN(estoqueFloat) ||
      !categoria.trim() ||
      !tamanho.trim() ||
      !descricao.trim()
    ) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos corretamente');
      return;
    }

    try {
      const conn = await openDb();
        await conn.execAsync(
          'INSERT INTO produtos (nome, imagem, cor, preco, estoque, categoria, tamanhos, descricao, modelo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [nome, imagem, cor, preco, estoque, categoria, tamanho, descricao, modelo]
        );

      Alert.alert('Sucesso', 'Camiseta adicionada com sucesso!');
      setNome('');
      setImagem('');
      setCor('');
      setPreco('');
      setEstoque('');
      setCategoria('');
      setTamanho('');
      setDescricao('');
        setModelo('');
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
      <TextInput
        style={styles.input}
        placeholder="Estoque"
        keyboardType="numeric"
        value={estoque}
        onChangeText={setEstoque}
      />
      <TextInput
        style={styles.input}
        placeholder="Categoria"
        value={categoria}
        onChangeText={setCategoria}
      />
      <TextInput
        style={[styles.input, { height: 80 }]}
        placeholder="Descrição"
        multiline
        value={descricao}
        onChangeText={setDescricao}
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
