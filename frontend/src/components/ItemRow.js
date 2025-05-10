import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { updateItem } from '../api/shopping';

export default function ItemRow({ item, onToggle, onDelete }){
  const toggle = () => {
    updateItem(item.id, { comprado: !item.comprado })
      .then(onToggle);
  };

  return (
    <View style={{
      flexDirection:'row', justifyContent:'space-between',
      alignItems:'center', paddingVertical:8, borderBottomWidth:1, borderColor:'#ddd'
    }}>
      <TouchableOpacity onPress={toggle} style={{ flex:1 }}>
        <Text style={{
          textDecorationLine: item.comprado ? 'line-through' : 'none'
        }}>
          {item.descricao} ({item.quantidade}) — R$ {item.precoPago}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onDelete} style={{ padding:8 }}>
        <Text>🗑️</Text>
      </TouchableOpacity>
    </View>
  );
}