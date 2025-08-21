import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Dimensions,
} from "react-native";

function TelaDetalhesProduto({ route, navigation }) {
  const { produtoSelecionado } = route.params;
  const [quantidade, setQuantidade] = useState(1);

  // Rotação da tela
  const [tela, setTela] = useState(Dimensions.get("window"));

  useEffect(() => {
    const callback = ({ window }) => setTela(window);
    const subscription = Dimensions.addEventListener("change", callback);
    return () => subscription?.remove();
  }, []);

  const paisagem = tela.width > tela.height;

  const adicionarAoCarrinho = () => {
    Alert.alert(
      "Sucesso! 🎉",
      `${quantidade} ${produtoSelecionado.nome} adicionado(s) ao carrinho!`,
      [{ text: "Continuar Comprando", onPress: () => navigation.goBack() }]
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
      {/* Botão voltar */}
      <TouchableOpacity
        style={estilos.botaoVoltar}
        onPress={() => navigation.goBack()}
      >
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
            onPress={() => alterarQuantidade(-1)}
          >
            <Text style={estilos.textoQuantidade}>-</Text>
          </TouchableOpacity>

          <Text style={estilos.numeroQuantidade}>{quantidade}</Text>

          <TouchableOpacity
            style={estilos.botaoQuantidade}
            onPress={() => alterarQuantidade(1)}
          >
            <Text style={estilos.textoQuantidade}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Botão adicionar ao carrinho */}
      <TouchableOpacity
        style={estilos.botaoComprar}
        onPress={adicionarAoCarrinho}
      >
        <Text style={estilos.textoBotaoComprar}>🛒 Adicionar ao carrinho</Text>
      </TouchableOpacity>

      {/* Feedback de rotação */}
      <View
        style={[
          estilos.containerRotacao,
          { backgroundColor: paisagem ? "#4CAF50" : "#1976D2" },
        ]}
      >
        <Text style={estilos.textoRotacao}>
          {paisagem ? "Modo de paisagem detectado 😀" : "Modo retrato 🙃"}
        </Text>
      </View>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  botaoVoltar: {
    margin: 12,
    padding: 8,
    alignSelf: "flex-start",
  },
  textoVoltar: {
    fontSize: 16,
    color: "#007BFF",
  },
  imagemGrande: {
    width: "100%",
    height: 400,
    resizeMode: "auto",
    backgroundColor: "#FFF",
  },
  detalhesContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -12,
    elevation: 4, // sombra no Android
    shadowColor: "#000", // sombra no iOS
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  nomeProdutoGrande: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 6,
  },
  precoProdutoGrande: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#28A745",
    marginBottom: 12,
  },
  descricaoProduto: {
    fontSize: 16,
    color: "#444",
    marginBottom: 14,
    lineHeight: 22,
  },
  estoque: {
    fontSize: 18,
    color: "#555",
    fontWeight: "bold",
    marginTop: 8,
  },
  alinhamento: {
    flexDirection: "row",
    marginBottom: 10,
  },
  chip: {
    backgroundColor: "#d3d3d3",
    marginRight: 10,
    borderRadius: 25,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  seletorQuantidade: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
    marginTop: 10,
  },
  labelQuantidade: {
    fontSize: 16,
    fontWeight: "600",
    marginRight: 12,
  },
  controlesQuantidade: {
    flexDirection: "row",
    alignItems: "center",
  },
  botaoQuantidade: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: "#E9ECEF",
    justifyContent: "center",
    alignItems: "center",
  },
  textoQuantidade: {
    fontSize: 20,
    fontWeight: "bold",
  },
  numeroQuantidade: {
    fontSize: 18,
    marginHorizontal: 14,
    fontWeight: "bold",
  },
  botaoComprar: {
    backgroundColor: "#28A745",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  textoBotaoComprar: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  containerRotacao: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginTop: 10,
  },
  textoRotacao: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
});

export default TelaDetalhesProduto;
