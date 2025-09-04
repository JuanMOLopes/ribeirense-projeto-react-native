import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import TelaLogin from './screens/TelaLogin';
import TelaProdutos from './screens/TelaProdutos';
import TelaDetalhes from './screens/TelaDetalhes';

import * as SQLite from 'expo-sqlite';

const Stack = createStackNavigator();

export default function App() {
  const [db, setDb] = useState(null);
  const [produtosIniciais, setProdutosIniciais] = useState([
    {
      nome: 'Camisa Azul',
      imagem:
        'https://lh5.googleusercontent.com/O9ghntqBJSGFvZOEH0b8A3JCwS6hzVVSUYUxG4UR0ZNZUQMmrDxpxLlvchnlI3QNcjCghKfRDtu1BC1DDoVu3lLRSulBOLysnt9qpWS5-USbj9O5bZRBUVjrW39pqTFlTAaOC3VJfVkNcv4lw5viwShAGc-N5q6pJhspeK4oSo5OmmynmRcAeQ=w1280',
      cor: 'Azul',
      preco: 149.99,
      estoque: 15,
      categoria: 'camisa',
      tamanhos: 'P,M,G,GG',
      descricao:
        'Camisa oficial azul do Ribeirense, modelo 2025. Tecido leve e respirável.',
    },
    {
      nome: 'Camisa Branca',
      imagem:
        'https://lh5.googleusercontent.com/RrjSTr-ahFF2jt8EDT9_XsFOGNgaB0wH558_3nOb6TNnnSq4HCsvxsplb4pcY6BLIai_hb9c4k4VRzsR00cK9sKc9SJqZdFIzvSps86vgmfQXneiYD5X4ScqHro7xz4n5o9oCxuPwrkfxC8aKLaWi7in2UP6KEi9Z9EHUM8WX4dRZeJFEIIWoA=w1280',
      cor: 'Branco',
      preco: 149.99,
      estoque: 15,
      categoria: 'camisa',
      tamanhos: 'P,M,G,GG',
      descricao:
        'Camisa reserva branca do Ribeirense, ideal para jogos fora de casa.',
    },
    {
      nome: 'Camisa Preta',
      imagem:
        'https://lh4.googleusercontent.com/-Xt_JtfFWpUfBIb5txF-hIhQ3Oo08dNRF6IgzsYkLY5MilUoFMwiYZUdPP8EL9DeOjHJl_6QpvIiYmrK6qN5MCDHXoIMXZSjx8evJVMcqovCkgOhEp31eEjBg6ae3QdVFaDVnwoSgYOlHrLPWFK_XFiJhXx30XuUe902ZOuUsWvkIIfju0FcJQ=w1280',
      cor: 'Preta',
      preco: 149.99,
      estoque: 15,
      categoria: 'camisa',
      tamanhos: 'M,G,GG',
      descricao: 'Camisa preta do Ribeirense, edição limitada retrô.',
    },
    {
      nome: 'Camisa Roxa - Goleiro',
      imagem:
        'https://lh3.googleusercontent.com/KT3AXnEWIklLsfqbxFIrfnZq8UXSzY7uXWwK8Xyxf8PzR81RuIEK6c0YOUDxv0DgKnnDIKPlLib-M5VkAp35A_hXLAXmi_TQLTUwChSTuF6JIdL3cRM7KGztMxha1kRg-Bbyldc7O_fijNuWAYnDh96hvJvGCfSjWZYNywwEzZB0dHOYKmyAyA=w1280',
      cor: 'Vermelha,Azul',
      preco: 149.99,
      estoque: 15,
      categoria: 'camisa',
      tamanhos: 'P,M,G',
      descricao:
        'Camisa roxa de goleiro do Ribeirense, design exclusivo da temporada',
    },
  ]);

  useEffect(() => {
    async function inicializarBanco() {
      try {
        const database = await SQLite.openDatabaseAsync('produtosBanco.db');
        setDb(database);
        console.log('✅ Banco de dados conectado');
      } catch (error) {
        console.error('❌ Erro ao abrir banco:', error);
        Alert.alert('Erro', 'Não foi possível conectar ao banco de dados.');
      }
    }

    inicializarBanco();
  }, []);

  useEffect(() => {
    async function prepararDados() {
      if (!db) return;

      try {
        await db.execAsync(`
          CREATE TABLE IF NOT EXISTS produtos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            preco REAL NOT NULL,
            imagem TEXT,
            descricao TEXT,
            estoque REAL NOT NULL,
            cor TEXT,
            categoria TEXT,
            tamanhos TEXT
          );
        `);

        const resultado = await db.getAllAsync(
          'SELECT COUNT(*) as count FROM produtos'
        );
        if (resultado[0].count === 0) {
          for (const produto of produtosIniciais) {
            await db.runAsync(
              `INSERT INTO produtos (nome, imagem, cor, preco, estoque, categoria, tamanhos, descricao)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
              [
                produto.nome,
                produto.imagem,
                produto.cor,
                produto.preco,
                produto.estoque,
                produto.categoria,
                produto.tamanhos,
                produto.descricao,
              ]
            );
          }
          console.log('✅ Produtos iniciais inseridos');
        } else {
          console.log('ℹ️ Produtos já existentes, inserção ignorada');
        }
      } catch (error) {
        console.error('❌ Erro ao preparar dados:', error);
        Alert.alert('Erro', 'Falha ao preparar os dados iniciais.');
      }
    }

    prepararDados();
  }, [db]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TelaLogin">
        <Stack.Screen
          name="TelaLogin"
          component={TelaLogin}
          options={{ title: 'Login' }}
        />

        <Stack.Screen
          name="TelaMenu"
          component={TelaMenu}
          options={{ title: 'Menu' }}
        />

        <Stack.Screen
          name="ListaCamisetas"
          component={TelaProdutos}
          options={{ title: 'Produtos' }}
        />

        <Stack.Screen
          name="TelaDetalhes"
          component={TelaDetalhes}
          options={{ title: 'Detalhes' }}
        />

        <Stack.Screen
          name="Inserir"
          component={Inserir}
          options={{ title: 'inserir camisetas' }}
        />

        <Stack.Screen
          name="ListaNome"
          component={ListaNome}
          options={{ title: 'Listar nome' }}
        />

        <Stack.Screen
          name="ListaCores"
          component={ListaCores}
          options={{ title: 'Listar cores' }}
        />

        <Stack.Screen
          name="ListaDeDesejos"
          component={ListaDeDesejos}
          options={{ title: 'Lista de desejos' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
