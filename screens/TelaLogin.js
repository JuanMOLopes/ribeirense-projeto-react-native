import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput, // Campo de entrada de texto
  TouchableOpacity, // respondam a toques -> animação que reduz a opacidade
  StyleSheet,
  Alert,
  Modal, // Componente para exibir janelas modais
  ActivityIndicator,
} from 'react-native';

// Importa a biblioteca AsyncStorage.
import AsyncStorage from '@react-native-async-storage/async-storage';

function TelaLogin({ navigation }) {
  // para navegação entre telas

  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [apelido, setApelido] = useState('');
  const [mensagemModal, setMensagemModal] = useState('');
  const [loginConcluido, setLoginConcluido] = useState(false);
  const [loading, setLoading] = useState(false); // Estado para o ActivityIndicator

  // Função para salvar os dados no AsyncStorage
  const salvarDados = async () => {
    try {
      // Cria um objeto com os dados
      const dados = {usuario, senha, apelido};
      // Converte o objeto para uma string (JSON.stringify)
      const dadosEmString = JSON.stringify(dados);
      // Salva a string no AsyncStorage com a chave 'dadosDoUsuario'
      await AsyncStorage.setItem('dadosDoUsuario', dadosEmString);
      Alert.alert('Sucesso', 'Dados salvos com sucesso!');
    } catch (e) {
      Alert.alert('Erro', 'Falha ao salvar dados.');
      console.error(e);
    }
  };

  const usuarioValido = [
    {
      senha: '123',
      usuario: 'aluno',
    },
  ];

  // Função que vai validar o login , se os campos não forem preenchidos, vai aparecer a mensagem definida
  const realizarLogin = () => {
    if (!usuario || !senha) {
      setMensagemModal('⚠️ Preencha usuário e senha');
      return;
    }

    // Procura se existe um usuário que bate com os dados digitados
    const usuarioEncontrado = usuarioValido.find(
      (user) => user.usuario === usuario && user.senha === senha
    );

    // Se encontrou o usuário válido
    if (usuarioEncontrado) {
      // Monta um objeto com dados que podem ser enviados para a próxima tela

      const dadosParaEnviar = {
        usuario: {
          ...usuarioEncontrado, // copia os dados do usuário
          senha: undefined, // remove a senha por segurança
        },
      };

      // chama a função para salvar os dados no asyncstorage
      salvarDados();

      // Define a mensagem de sucesso no modal
      setMensagemModal('✅ Login concluído');
      setLoginConcluido(true);
      setLoading(true); //  Mostra o ActivityIndicator

      // Aguarda 2 segundos e navega para a tela de lista de produtos
      setTimeout(() => {
        setMensagemModal('');
        setLoading(false);
        navigation.navigate('TelaProdutos', dadosParaEnviar);
      }, 2000);
    } else {
      // Se não encontrou o usuário, mostra mensagem de erro
      setMensagemModal('❌ Usuário ou senha incorretos');
    }
  };

  return (
    <View style={estilos.container}>
      <Text style={estilos.titulo}>🔐 Login</Text>
      <Text style={estilos.subtitulo}>Entre na sua conta</Text>

      <TextInput
        style={estilos.input}
        placeholder="Usuário"
        value={usuario}
        onChangeText={setUsuario}
        keyboardType="email-address"
      />

      <TextInput
        style={estilos.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry // Oculta caracteres
      />

      <TextInput
        style={estilos.input}
        placeholder="Apelido (Obrigatório)"
        value={apelido}
        onChangeText={setApelido}
      />

      <TouchableOpacity style={estilos.botaoLogin} onPress={realizarLogin}>
        <Text style={estilos.textoBotaoLogin}>👉 Entrar</Text>
      </TouchableOpacity>

      <Text style={estilos.dicaLogin}>💡 Dica: use aluno | 123</Text>

      <Modal transparent animationType="fade" visible={!!mensagemModal}>
        <View style={estilos.modalContainer}>
          <View style={estilos.modalBox}>
            <Text style={estilos.modalTexto}>{mensagemModal}</Text>

            {/* se `loading` for true mostra o carregamento*/}
            {loading && (
              <ActivityIndicator
                size="large"
                color="#4CAF50"
                style={{ marginTop: 10 }}
              />
            )}

            {/* Botão Fechar só aparece se login não foi concluído */}
            {!loginConcluido && (
              <TouchableOpacity
                style={estilos.modalBotao}
                onPress={() => setMensagemModal('')} // Fecha o modal
              >
                <Text style={estilos.modalBotaoTexto}>Fechar</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },

  titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },

  subtitulo: { fontSize: 16, color: '#555', marginBottom: 20 },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },

  botaoLogin: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },

  textoBotaoLogin: { color: '#fff', fontSize: 16, fontWeight: 'bold' },

  dicaLogin: { marginTop: 15, fontSize: 12, color: '#888' },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },

  modalBox: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    minWidth: '70%',
  },

  modalTexto: { fontSize: 16, marginBottom: 15, textAlign: 'center' },

  modalBotao: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },

  modalBotaoTexto: { color: '#fff', fontWeight: 'bold' },
});

export default TelaLogin;
