// InsertAsync.js
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  Button,
  Alert,
  Image,
} from 'react-native';
import SQLite from 'expo-sqlite'; // biblioteca assíncrona

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

  let db;

  // Criar tabela ao montar o componente
  useEffect(() => {
    async function setupDb() {
      try {
        db = await SQLite.openDatabaseAsync('produtosBanco.db');
        await db.execAsync(`
          CREATE TABLE IF NOT EXISTS produtos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT,
            imagem TEXT,
            cor TEXT,
            preco REAL,
            estoque INTEGER,
            categoria TEXT,
            tamanho TEXT,
            descricao TEXT,
            modelo TEXT
          );
        `);
        console.log('✅ Tabela criada com sucesso');
      } catch (err) {
        console.error('❌ Erro ao criar tabela:', err);
        Alert.alert('Erro', 'Não foi possível criar a tabela');
      }
    }
    setupDb();
  }, []);

  const Inserir = async () => {
    const precoFloat = parseFloat(preco);
    const estoqueInt = parseInt(estoque);

    if (
      !nome.trim() ||
      !imagem.trim() ||
      !cor.trim() ||
      isNaN(precoFloat) ||
      isNaN(estoqueInt) ||
      !categoria.trim() ||
      !tamanho.trim() ||
      !descricao.trim()
    ) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos corretamente');
      return;
    }

    try {
      db = await SQLite.openDatabaseAsync('produtosBanco.db');
      await db.runAsync(
        `INSERT INTO produtos (nome, imagem, cor, preco, estoque, categoria, tamanho, descricao, modelo)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [nome, imagem, cor, precoFloat, estoqueInt, categoria, tamanho, descricao, modelo]
      );

      Alert.alert('Sucesso', 'Camiseta adicionada com sucesso!');
      // Limpar campos
      setNome(''); setPreco(''); setImagem(''); setCor('');
      setTamanho(''); setModelo(''); setEstoque('');
      setCategoria(''); setDescricao('');
    } catch (err) {
      console.error('❌ Erro ao inserir:', err);
      Alert.alert('Erro', 'Falha ao inserir camiseta');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Adicionar Nova Camiseta</Text>

      <TextInput style={styles.input} placeholder="Nome da camiseta" value={nome} onChangeText={setNome} />
      <TextInput style={styles.input} placeholder="Preço" keyboardType="numeric" value={preco} onChangeText={setPreco} />
      <TextInput style={styles.input} placeholder="Tamanho" value={tamanho} onChangeText={setTamanho} />
      <TextInput style={styles.input} placeholder="Cor" value={cor} onChangeText={setCor} />
      <TextInput style={styles.input} placeholder="Modelo (F/M)" value={modelo} onChangeText={setModelo} />
      <TextInput style={styles.input} placeholder="URL da imagem" value={imagem} onChangeText={setImagem} />
      <TextInput style={styles.input} placeholder="Estoque" keyboardType="numeric" value={estoque} onChangeText={setEstoque} />
      <TextInput style={styles.input} placeholder="Categoria" value={categoria} onChangeText={setCategoria} />
      <TextInput style={[styles.input, { height: 80 }]} placeholder="Descrição" multiline value={descricao} onChangeText={setDescricao} />

      {imagem ? (
        <Image source={{ uri: imagem }} style={{ width: 200, height: 200, marginBottom: 10, borderRadius: 8 }} resizeMode="contain" />
      ) : null}

      <Button title="Adicionar Camiseta" onPress={Inserir} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { width: '100%', height: 40, borderColor: 'gray', borderWidth: 1, borderRadius: 5, paddingHorizontal: 10, marginBottom: 10 },
});
