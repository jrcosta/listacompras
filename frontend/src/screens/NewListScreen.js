import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { createList } from '../api/shopping';

export default function NewListScreen({ navigation }){
  const [name, setName] = useState('');

  const save = () => {
    if(!name.trim()) return Alert.alert('Preencha o nome');
    createList({ nome: name.trim() })
      .then(list => navigation.replace('Items',{ listId:list.id, listName:list.nome }));
  };

  return (
    <View style={{ flex:1, padding:16 }}>
      <TextInput
        placeholder="Nome da lista"
        value={name}
        onChangeText={setName}
        style={{
          borderWidth:1, borderColor:'#ccc',
          padding:8, borderRadius:4, marginBottom:12
        }}
      />
      <Button title="Salvar" onPress={save} />
    </View>
  );
}
