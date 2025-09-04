import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import TelaLogin from './screens/TelaLogin';
import TelaProdutos from './screens/TelaProdutos';
import TelaDetalhes from './screens/TelaDetalhes';
import ListaDeDesejos from './screens/ListaDeDesejos';
import TelaMenu from './screens/TelaMenu';

const Stack = createStackNavigator();

export default function App() {
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
