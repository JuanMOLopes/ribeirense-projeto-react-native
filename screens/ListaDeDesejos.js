import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  ScrollView,
  Alert,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

function TelaListaProdutos({ navigation }) {
  // Estado que armazenará os dados do async storage
  const [dadosCarregados, setDadosCarregados] = useState(null);
  const [produtosSalvosCarregados, setProdutosSalvosCarregados] =
    useState(null); // cria um estado que se inicia nulo para pegar todos os produtos salvos

  const [tela, setTela] = useState(Dimensions.get('window'));

  useEffect(() => {
    const carregarDados = async () => {
      try {
        // Busca a string salva no AsyncStorage com a chave 'dadosDoUsuario'
        const dadosEmString = await AsyncStorage.getItem('dadosDoUsuario');
        if (dadosEmString !== null) {
          // Converte a string de volta para um objeto (JSON.parse)
          const dados = JSON.parse(dadosEmString);
          setDadosCarregados(dados);
          Alert.alert('Sucesso', 'Dados carregados!');
        } else {
          Alert.alert('Aviso', 'Nenhum dado encontrado.');
          setDadosCarregados(null);
        }
      } catch (e) {
        Alert.alert('Erro', 'Falha ao carregar dados.');
        console.error(e);
      }
    };

    carregarDados();
  }, []);

  // Carregar dados do produto
  useEffect(() => {
    // Função para carregar os dados do AsyncStorage, é executado quando a página carrega ****
    const carregarDadosProduto = async () => {
      try {
        // Busca a string salva no AsyncStorage com a chave 'dadosProdutoSalvo'
        // Acessa o async storage (onde estão salvos os dados do produto salvo) e pega as informações (getItem)
        const dadosEmString = await AsyncStorage.getItem('dadosProdutoSalvo');
        if (dadosEmString !== null) {
          // Converte a string de volta para um objeto (JSON.parse)
          const dados = JSON.parse(dadosEmString);
          setProdutosSalvosCarregados(dados); // joga para dentro do estado
        } else {
          setProdutosSalvosCarregados(null);
        }
      } catch (e) {
        Alert.alert('Erro', 'Falha ao carregar dados.');
        console.error(e);
      }
    };

    console.log(produtosSalvosCarregados); // pega todos os dados e exibe no console
    carregarDadosProduto(); //executa a função de cima
  }, []);

  useEffect(() => {
    const callback = ({ window }) => setTela(window);
    const subscription = Dimensions.addEventListener('change', callback);
    return () => subscription?.remove();
  }, []);

  const paisagem = tela.width > tela.height;

  const renderizarProduto = ({ item }) => (
    <TouchableOpacity style={estilos.itemProduto}>
      <Image source={{ uri: item.imagem }} style={estilos.imagemProduto} />
      <View style={estilos.infoProduto}>
        <Text style={estilos.nomeProduto}>{item.nome}</Text>
        <Text style={estilos.precoProduto}>R$ {item.preco.toFixed(2)}</Text>
        <Text style={estilos.descricaoProduto} numberOfLines={2}>
          {item.descricao}
        </Text>
      </View>
      <Text style={estilos.setaDireita}>▶</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView>
      <SafeAreaView style={estilos.container}>
        <View style={estilos.header}>
          <Image
            source={{
              uri: 'https://i.ytimg.com/vi/xSUfdimXEbk/maxresdefault.jpg',
            }}
            style={estilos.logo}
          />
          <Text style={estilos.titulo}>RIBEIRENSE</Text>
          <Text style={estilos.subtitulo}>
            Sua lista de desejos, {dadosCarregados ? dadosCarregados.apelido : ''}!
          </Text>
        </View>

        <FlatList
          data={produtosSalvosCarregados}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderizarProduto}
          showsVerticalScrollIndicator={false}
        />

        {/* Feedback de rotação */}
        <View
          style={[
            estilos.containerRotacao,
            { backgroundColor: paisagem ? '#4CAF50' : '#1976D2' },
          ]}>
          <Text style={estilos.textoRotacao}>
            {paisagem ? 'Modo de paisagem detectado 😀' : 'Modo retrato 🙃'}
          </Text>
        </View>

        <View style={estilos.footer}>
          <Text style={estilos.titulo}>Projeto realizado por grupo 2</Text>

          <View style={estilos.lista}>
            <Text style={estilos.integrante}>• Agatha França</Text>
            <Text style={estilos.integrante}>• Ana Beatriz</Text>
            <Text style={estilos.integrante}>• Juan Lopes</Text>
            <Text style={estilos.integrante}>• Lucas Marin</Text>
            <Text style={estilos.integrante}>• Zayra França</Text>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

export default TelaListaProdutos;

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
    textAlign: 'center',
    marginTop: 6,
  },
  subtitulo: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
    textAlign: 'center',
    marginTop: 6,
  },
  header: {
    backgroundColor: '#094fd3',
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  logo: {
    width: 220,
    height: 90,
  },
  itemProduto: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  imagemProduto: {
    width: 100,
    height: 135,
    borderRadius: 8,
    marginRight: 12,
  },
  infoProduto: {
    flex: 1,
  },
  nomeProduto: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  precoProduto: {
    fontSize: 14,
    color: '#009688',
  },
  descricaoProduto: {
    fontSize: 14,
    color: '#444',
    marginBottom: 14,
    marginTop: 5,
    lineHeight: 22,
  },
  setaDireita: {
    fontSize: 20,
    marginLeft: 8,
  },
  containerRotacao: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 14,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  textoRotacao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  footer: {
    backgroundColor: '#094fd3',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lista: {
    marginTop: 4,
    paddingLeft: 12,
  },
  integrante: {
    fontSize: 16,
    color: '#fff',
    marginVertical: 2,
  },
});
