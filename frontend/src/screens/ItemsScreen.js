// src/screens/ItemsScreen.js
import React, { useState, useCallback } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  Button,
  Text,
  Alert,
  Platform
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { fetchItems, deleteItem, deleteList } from '../api/shopping';
import ItemRow from '../components/ItemRow';

export default function ItemsScreen({ route, navigation }) {
  const { listId, listName } = route.params;
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Função que busca os itens
  const load = useCallback(() => {
    setLoading(true);
    fetchItems(listId)
      .then(data => setItems(data))
      .catch(err => {
        console.error('Erro ao carregar itens:', err);
        Alert.alert('Erro', 'Não foi possível carregar os itens');
      })
      .finally(() => setLoading(false));
  }, [listId]);

  // Recarrega sempre que a tela ganha foco
  useFocusEffect(load);

  // Deleta toda a lista e volta para a tela de listas
  const handleDeleteList = () => {
    deleteList(listId)
      .then(() => navigation.navigate('Lists'))
      .catch(err => {
        console.error('Erro ao excluir lista:', err);
        Alert.alert('Erro', 'Não foi possível excluir a lista');
      });
  };

  // Prompt de confirmação adaptado para Web/Mobile
  const confirmDeleteList = () => {
    const msg = `Deseja realmente excluir a lista "${listName}"?`;
    if (Platform.OS === 'web') {
      if (window.confirm(msg)) handleDeleteList();
    } else {
      Alert.alert(
        'Confirmar exclusão',
        msg,
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Excluir', style: 'destructive', onPress: handleDeleteList }
        ]
      );
    }
  };

  if (loading) {
    return <ActivityIndicator style={{ flex: 1 }} />;
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {/* Botão de adicionar item */}
      <Button
        title="Adicionar Item"
        onPress={() =>
          navigation.navigate('NewItem', { listId, listName })
        }
      />

      {/* Itens ou mensagem de vazio */}
      {items.length > 0 ? (
        <FlatList
          data={items}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <ItemRow
              item={item}
              onToggle={load}
              onDelete={() =>
                deleteItem(item.id)
                  .then(load)
                  .catch(err => {
                    console.error('Erro ao excluir item:', err);
                    Alert.alert('Erro', 'Não foi possível excluir o item');
                  })
              }
            />
          )}
        />
      ) : (
        <Text style={{
          textAlign: 'center',
          marginTop: 32,
          color: '#666'
        }}>
          Nenhum item em “{listName}”
        </Text>
      )}

      {/* Botão de excluir lista inteira */}
      <View style={{ marginTop: 24 }}>
        <Button
          title="Excluir Lista Inteira"
          color="red"
          onPress={confirmDeleteList}
        />
      </View>
    </View>
  );
}
