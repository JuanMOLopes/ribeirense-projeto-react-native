import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

export default function TelaInicial({ navigation }) {
  return (
    <View style={styles.container}>

  
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ListaCamisetas')}
      >
        <Text style={styles.text}>Lista todas as camisetas</Text>
      </TouchableOpacity>


      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Inserir')}
      >
        <Text style={styles.text}>Inserir camiseta</Text>
      </TouchableOpacity>


      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ListaNome')}
      >
        <Text style={styles.text}>Listar por nome</Text>
      </TouchableOpacity>

    
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ListaCores')}
      >
        <Text style={styles.text}>Listar por cores</Text> 
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.sair}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.text}>sair</Text>
      </TouchableOpacity> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F4F6', 
    padding: 20,
  },
  button: {
    backgroundColor: '#2563EB', 
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3, 
  },
  text: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
sair: {
    backgroundColor: '#FF0000',
    paddingHorizontal: 30,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3, 
  },
});
