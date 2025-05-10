// src/navigation/AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ListsScreen   from '../screens/ListsScreen';
import NewListScreen from '../screens/NewListScreen';
import ItemsScreen   from '../screens/ItemsScreen';
import NewItemScreen from '../screens/NewItemScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Lists">
        <Stack.Screen 
          name="Lists" 
          component={ListsScreen} 
          options={{ title: 'Minhas Listas' }} 
        />
        <Stack.Screen 
          name="NewList" 
          component={NewListScreen} 
          options={{ title: 'Nova Lista' }} 
        />
        <Stack.Screen
          name="Items"
          component={ItemsScreen}
          options={({ route }) => ({
            title: `Lista de Compras: ${route.params?.listName ?? ''}`
          })}
        />
        <Stack.Screen 
          name="NewItem" 
          component={NewItemScreen} 
          options={{ title: 'Novo Item' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
