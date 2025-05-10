// src/screens/NewItemScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import AutocompleteInput from '../components/AutocompleteInput';
import { createItem } from '../api/shopping';

export default function NewItemScreen({ route, navigation }) {
  const { listId } = route.params;
  const [desc, setDesc] = useState('');
  const [qty, setQty] = useState('');
  const [price, setPrice] = useState('');

  const save = () => {
    if (!desc.trim() || !qty || !price) {
      return Alert.alert('Preencha todos os campos');
    }
    createItem(listId, {
      descricao: desc.trim(),
      quantidade: parseInt(qty, 10),
      precoPago: parseFloat(price)
    })
      .then(() => navigation.goBack())
      .catch(err => {
        console.error('Erro ao salvar item:', err);
        Alert.alert('Erro', 'Não foi possível salvar o item');
      });
  };

  return (
    <View style={{ flex:1, padding:16 }}>
      <AutocompleteInput
        value={desc}
        onChangeText={setDesc}
        placeholder="Descrição do item"
      />

      <TextInput
        placeholder="Quantidade"
        value={qty}
        onChangeText={setQty}
        keyboardType="number-pad"
        style={{
          borderWidth:1, borderColor:'#ccc',
          padding:8, borderRadius:4, marginBottom:16
        }}
      />

      <TextInput
        placeholder="Preço pago"
        value={price}
        onChangeText={setPrice}
        keyboardType="decimal-pad"
        style={{
          borderWidth:1, borderColor:'#ccc',
          padding:8, borderRadius:4, marginBottom:24
        }}
      />

      <Button title="Salvar Item" onPress={save} />
    </View>
  );
}
