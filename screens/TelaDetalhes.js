import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Dimensions,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

function TelaDetalhesProduto({ route, navigation }) {
  // Estado que armazenará os dados do async storage
  const [dadosCarregados, setDadosCarregados] = useState(null); // cria um estado que se inicia nulo

  const { produtoSelecionado } = route.params;
  const [quantidade, setQuantidade] = useState(1);

  // Rotação da tela
  const [tela, setTela] = useState(Dimensions.get('window'));

  useEffect(() => {
    // Função para carregar os dados do AsyncStorage, é executado quando a página carrega **** 
    const carregarDados = async () => {
      try {
        // Busca a string salva no AsyncStorage com a chave 'dadosDoUsuario'
        const dadosEmString = await AsyncStorage.getItem('dadosDoUsuario');
        if (dadosEmString !== null) {
          // Converte a string de volta para um objeto (JSON.parse)
          const dados = JSON.parse(dadosEmString);
          setDadosCarregados(dados); // joga para dentro do estado
        } else {
          Alert.alert('Aviso', 'Nenhum dado encontrado.');
          setDadosCarregados(null);
        }
      } catch (e) {
        Alert.alert('Erro', 'Falha ao carregar dados.');
        console.error(e);
      }
    };

    console.log(dadosCarregados); // pega todos os dados e exibe no console 
    carregarDados(); //executa a função de cima 
  }, []);

  useEffect(() => {
    const callback = ({ window }) => setTela(window);
    const subscription = Dimensions.addEventListener('change', callback);
    return () => subscription?.remove();
  }, []);

  const paisagem = tela.width > tela.height;

  const adicionarALista = () => {
    Alert.alert(
      'Sucesso! 🎉',
      `${quantidade} ${produtoSelecionado.nome} adicionado(s) a lista de desejos!`,
      [{ text: 'Continuar Comprando', onPress: () => navigation.goBack() }]
    );
  };

  const removerDalista = () => {
    Alert.alert(
      'Sucesso! 🎉',
      `${quantidade} ${produtoSelecionado.nome} removido(s) da lista de desejos!`,
      [{ text: 'Continuar Comprando', onPress: () => navigation.goBack() }]
    );
  };

  const alterarQuantidade = (incremento) => {
    const novaQuantidade = quantidade + incremento;
    if (novaQuantidade >= 1 && novaQuantidade <= produtoSelecionado.estoque) {
      setQuantidade(novaQuantidade);
    }
  };

  return (
    <ScrollView style={estilos.container}>
      <Text style={estilos.subtitulo}>
        Obrigado por comprar conosco, {dadosCarregados ? dadosCarregados.apelido : ''}!
      </Text>
      {/* Botão voltar */}
      <TouchableOpacity
        style={estilos.botaoVoltar}
        onPress={() => navigation.goBack()}>
        <Text style={estilos.textoVoltar}>⬅ Voltar</Text>
      </TouchableOpacity>

      {/* Imagem grande do produto */}
      <Image
        source={{ uri: produtoSelecionado.imagem }}
        style={estilos.imagemGrande}
      />

      {/* Detalhes do produto */}
      <View style={estilos.detalhesContainer}>
        <Text style={estilos.nomeProdutoGrande}>{produtoSelecionado.nome}</Text>
        <Text style={estilos.descricaoProduto}>
          {produtoSelecionado.descricao}
        </Text>
        <Text style={estilos.precoProdutoGrande}>
          R$ {produtoSelecionado.preco.toFixed(2)}
        </Text>

        {/* Extras */}
        <Text style={estilos.estoque}>Modelo: </Text>
        <View style={estilos.alinhamento}>
          <Text style={estilos.chip}>Masculino</Text>
          <Text style={estilos.chip}>Feminino</Text>
        </View>

        <Text style={estilos.estoque}>Tamanhos disponíveis: </Text>
        <View style={estilos.alinhamento}>
          <Text style={estilos.chip}>PP</Text>
          <Text style={estilos.chip}>P</Text>
          <Text style={estilos.chip}>M</Text>
          <Text style={estilos.chip}>G</Text>
        </View>
      </View>

      {/* Seletor de quantidade */}
      <View style={estilos.seletorQuantidade}>
        <Text style={estilos.labelQuantidade}>Quantidade:</Text>
        <View style={estilos.controlesQuantidade}>
          <TouchableOpacity
            style={estilos.botaoQuantidade}
            onPress={() => alterarQuantidade(-1)}>
            <Text style={estilos.textoQuantidade}>-</Text>
          </TouchableOpacity>

          <Text style={estilos.numeroQuantidade}>{quantidade}</Text>

          <TouchableOpacity
            style={estilos.botaoQuantidade}
            onPress={() => alterarQuantidade(1)}>
            <Text style={estilos.textoQuantidade}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Botão adicionar a lista de desejo */}
      <TouchableOpacity
        style={estilos.botaoComprar}
        onPress={adicionarALista}>
        <Text style={estilos.textoBotaoComprar}>🛒 Adicionar a lista de desejos</Text>
      </TouchableOpacity>

 {/* Botão rmover da lsita de desejos */}
      <TouchableOpacity
        style={estilos.botaoRemover}
        onPress={removerDalista}>
        <Text style={estilos.textoBotaoComprar}>🛒 Remover da lista de desejos</Text>
      </TouchableOpacity>


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
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  botaoVoltar: {
    margin: 12,
    padding: 8,
    alignSelf: 'flex-start',
  },
  textoVoltar: {
    fontSize: 16,
    color: '#007BFF',
  },
  subtitulo: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 3,
    color: '#007BFF',
    textAlign: 'center',
    marginTop: 6,
  },
  imagemGrande: {
    width: '100%',
    height: 400,
    resizeMode: 'auto',
    backgroundColor: '#FFF',
  },
  detalhesContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -12,
    elevation: 4, // sombra no Android
    shadowColor: '#000', // sombra no iOS
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  nomeProdutoGrande: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },
  precoProdutoGrande: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#28A745',
    marginBottom: 12,
  },
  descricaoProduto: {
    fontSize: 16,
    color: '#444',
    marginBottom: 14,
    lineHeight: 22,
  },
  estoque: {
    fontSize: 18,
    color: '#555',
    fontWeight: 'bold',
    marginTop: 8,
  },
  alinhamento: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  chip: {
    backgroundColor: '#d3d3d3',
    marginRight: 10,
    borderRadius: 25,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  seletorQuantidade: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
    marginTop: 10,
  },
  labelQuantidade: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 12,
  },
  controlesQuantidade: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  botaoQuantidade: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#E9ECEF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoQuantidade: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  numeroQuantidade: {
    fontSize: 18,
    marginHorizontal: 14,
    fontWeight: 'bold',
  },
  botaoComprar: {
    backgroundColor: '#28A745',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },

  botaoRemover: {
    backgroundColor: '#FF0000',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },

  textoBotaoComprar: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  containerRotacao: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginTop: 10,
  },
  textoRotacao: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
});

export default TelaDetalhesProduto;
