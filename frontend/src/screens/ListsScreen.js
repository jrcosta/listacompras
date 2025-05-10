// src/screens/ListsScreen.js
import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Button
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { fetchLists, deleteList } from '../api/shopping';

export default function ListsScreen({ navigation }) {
  const [lists, setLists]     = useState([]);
  const [loading, setLoading] = useState(true);

  // 1) useCallback para memoizar a função de load
  const load = useCallback(() => {
    setLoading(true);
    fetchLists()
      .then(setLists)
      .finally(() => setLoading(false));
  }, []);

  // 2) useFocusEffect para recarregar toda vez que a tela ganhar foco
  useFocusEffect(load);

  if (loading) return <ActivityIndicator style={{ flex: 1 }} />;

  if (lists.length === 0) {
    return (
      <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
        <Text>Nenhuma lista</Text>
        <Button title="Criar primeira" onPress={() => navigation.navigate('NewList')} />
      </View>
    );
  }

  return (
    <View style={{ flex:1, padding:16 }}>
      <Button title="Nova Lista" onPress={() => navigation.navigate('NewList')} />

      <FlatList
        data={lists}
        keyExtractor={l => String(l.id)}
        renderItem={({item}) => (
          <TouchableOpacity
            style={{ padding:12, borderBottomWidth:1, borderColor:'#eee' }}
            onPress={() => navigation.navigate('Items', {
              listId: item.id,
              listName: item.nome
            })}
            onLongPress={() => deleteList(item.id).then(load)}
          >
            <Text style={{ fontSize:18 }}>{item.nome}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
