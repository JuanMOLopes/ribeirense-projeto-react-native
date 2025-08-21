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
} from 'react-native';

function TelaListaProdutos({ navigation }) {
  const [tela, setTela] = useState(Dimensions.get('window'));

  useEffect(() => {
    const callback = ({ window }) => setTela(window);
    const subscription = Dimensions.addEventListener('change', callback);
    return () => subscription?.remove();
  }, []);

  const paisagem = tela.width > tela.height;

  const produtos = [
    {
      id: 1,
      nome: 'Camisa Azul',
      preco: 149.99,
      imagem:
        'https://lh5.googleusercontent.com/O9ghntqBJSGFvZOEH0b8A3JCwS6hzVVSUYUxG4UR0ZNZUQMmrDxpxLlvchnlI3QNcjCghKfRDtu1BC1DDoVu3lLRSulBOLysnt9qpWS5-USbj9O5bZRBUVjrW39pqTFlTAaOC3VJfVkNcv4lw5viwShAGc-N5q6pJhspeK4oSo5OmmynmRcAeQ=w1280',
      descricao:
        'Camisa oficial azul do Ribeirense, modelo 2025. Tecido leve e respirável.',
      estoque: 15,
      categoria: 'Camisa',
    },
    {
      id: 2,
      nome: 'Camisa Branca',
      preco: 149.99,
      imagem:
        'https://lh5.googleusercontent.com/RrjSTr-ahFF2jt8EDT9_XsFOGNgaB0wH558_3nOb6TNnnSq4HCsvxsplb4pcY6BLIai_hb9c4k4VRzsR00cK9sKc9SJqZdFIzvSps86vgmfQXneiYD5X4ScqHro7xz4n5o9oCxuPwrkfxC8aKLaWi7in2UP6KEi9Z9EHUM8WX4dRZeJFEIIWoA=w1280',
      descricao:
        'Camisa reserva branca do Ribeirense, ideal para jogos fora de casa.',
      estoque: 12,
      categoria: 'Camisa',
    },
    {
      id: 3,
      nome: 'Camisa Preta',
      preco: 159.99,
      imagem:
        'https://lh4.googleusercontent.com/-Xt_JtfFWpUfBIb5txF-hIhQ3Oo08dNRF6IgzsYkLY5MilUoFMwiYZUdPP8EL9DeOjHJl_6QpvIiYmrK6qN5MCDHXoIMXZSjx8evJVMcqovCkgOhEp31eEjBg6ae3QdVFaDVnwoSgYOlHrLPWFK_XFiJhXx30XuUe902ZOuUsWvkIIfju0FcJQ=w1280',
      descricao: 'Camisa preta do Ribeirense, edição limitada retrô.',
      estoque: 8,
      categoria: 'Camisa',
    },
    {
      id: 4,
      nome: 'Camisa Roxa - Goleiro',
      preco: 169.99,
      imagem:
        'https://lh3.googleusercontent.com/KT3AXnEWIklLsfqbxFIrfnZq8UXSzY7uXWwK8Xyxf8PzR81RuIEK6c0YOUDxv0DgKnnDIKPlLib-M5VkAp35A_hXLAXmi_TQLTUwChSTuF6JIdL3cRM7KGztMxha1kRg-Bbyldc7O_fijNuWAYnDh96hvJvGCfSjWZYNywwEzZB0dHOYKmyAyA=w1280',
      descricao:
        'Camisa roxa de goleiro do Ribeirense, design exclusivo da temporada.',
      estoque: 10,
      categoria: 'Camisa',
    },
    {
      id: 5,
      nome: 'Camisa eSports',
      preco: 139.99,
      imagem:
        'https://lh5.googleusercontent.com/BvDmf5JmmOapwiGTvkzMRgir4cqNmYPyWBwiz1OUrDHknYbjCUv0zMwPGZ9-EgWgtFyzc4C7TQCxQB0JE1Y8o6KZKJUAED5EFYKJj1aH1M0zZT4xgUkVPWFLFNsMsfVDjgKfiBFYIcoCJ5xOsaACdADG5sZvnpCF5uCY3fSov-DFBpSfvGgI=w1280',
      descricao:
        'Camisa oficial da line eSports do Ribeirense, estilo moderno e casual.',
      estoque: 20,
      categoria: 'Camisa',
    },
    {
      id: 6,
      nome: 'Calção Azul',
      preco: 99.99,
      imagem:
        'https://lh5.googleusercontent.com/PeGBkuNxRlhBYBGGqtEKqwa5OegOcuq62QsXWfr0QIg9lNNf2Dqx8Ypt9FGat1YC_EnRqCYfInhcW4hpGy3kcqPwgYpUfW8YREyhntepV8SbRqPA4q8wrwMLehKB_l2ejUy2-VIHPZGqrqKm4xpDLGcbjNTSrnIbnY55-MDuKi0w3oXkclWA4Q=w1280',
      descricao:
        'Calção azul do uniforme principal do Ribeirense, tecido dry-fit.',
      estoque: 25,
      categoria: 'Calção',
    },
    {
      id: 7,
      nome: 'Calção Branco',
      preco: 99.99,
      imagem:
        'https://lh3.googleusercontent.com/HiAhQsExlVuK5qxJ6vI5Wc_rPvZX1eaD9WTuq4vKmr-ltF_dPw8i-iKNwyME_pU1Ng08FvougyecCcmJ9_KJoNruCB-URof090kUsLdo_u1eknxbxdgG_FSXm0Ab5g-3MeeorQIAWL1CcdkKG4B5iajT0Wq-6O-EXD6TLD_sgLjpr4Y5QGVo3w=w1280',
      descricao:
        'Calção branco do uniforme reserva do Ribeirense, conforto e leveza.',
      estoque: 18,
      categoria: 'Calção',
    },
    {
      id: 8,
      nome: 'Calção Preto',
      preco: 109.99,
      imagem:
        'https://lh3.googleusercontent.com/t0ebTS9-ymlKsS0wVNdPhJOgs75g8s6BZxM4CwgVBVCqA6cbzXD5_6R-0qr-gVrmMXi_hgc1GmZ84nl_Z25Ak4CnP608vFiaYulB5JrUPr3_MKC43KXzw9HNcZE14P1YBZUIl_5sKGnEMsNW3Sfv20hpMB5hd4Cou1P1zamFYr5eCGaUBkxf-Q=w1280',
      descricao:
        'Calção preto edição especial do Ribeirense, combina com a camisa retrô.',
      estoque: 10,
      categoria: 'Calção',
    },
    {
      id: 9,
      nome: 'Calção Roxo - Goleiro',
      preco: 119.99,
      imagem:
        'https://lh4.googleusercontent.com/R4T-WVTF42hm0CVI72WutPbwIS2gqAQSa_NGjrGi83WxRIAF8UJZTND6PrU48o_7jkIDMdWRekbRVWkKf-6CYkgecOdcDbGt-0eKjAaxSJunHlHEfxPr_PT-iu8SUB8VjMWYZ2y8-18CUoUBi5FRFom-qcp-nADO57s4fIrMr9DuRKZQz6aUHg=w1280',
      descricao:
        'Calção roxo de goleiro do Ribeirense, resistente e confortável.',
      estoque: 14,
      categoria: 'Calção',
    },
    {
      id: 10,
      nome: 'Meião Branco',
      preco: 64.99,
      imagem: 'https://imgnike-a.akamaihd.net/360x360/01730551.jpg',
      descricao:
        'Conforto antissuor, caimento confortável e durabilidade para o jogo.',
      estoque: 25,
      categoria: 'Meião',
    },
    {
      id: 11,
      nome: 'Meião Azul',
      preco: 64.99,
      imagem: 'https://imgnike-a.akamaihd.net/360x360/01730515.jpg',
      descricao:
        'Conforto antissuor, caimento confortável e durabilidade para o jogo.',
      estoque: 18,
      categoria: 'Meião',
    },
  ];

  const abrirDetalhesProduto = (produto) => {
    navigation.navigate('TelaDetalhes', {
      produtoSelecionado: produto,
      origemNavegacao: 'lista_produtos',
      timestampVisita: Date.now(),
    });
  };

  const renderizarProduto = ({ item }) => (
    <TouchableOpacity
      style={estilos.itemProduto}
      onPress={() => abrirDetalhesProduto(item)}>
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
        </View>

        <FlatList
          data={produtos}
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
          <Text style={estilos.titulo}>
            Projeto realizado por grupo 2
          </Text>

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
