// src/components/AutocompleteInput.js
import React, { useState, useRef } from 'react';
import {
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native';
import { suggestDescriptions } from '../api/shopping';

export default function AutocompleteInput({
  value,
  onChangeText,
  placeholder
}) {
  const [filtered, setFiltered] = useState([]);
  const [show, setShow] = useState(false);
  const timeoutRef = useRef(null);

  const fetchSuggestions = async (text) => {
    try {
      const words = await suggestDescriptions(text);
      setFiltered(words);
      setShow(words.length > 0);
    } catch {
      setShow(false);
    }
  };

  const handleChange = (text) => {
    onChangeText(text);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (text.length > 0) {
      timeoutRef.current = setTimeout(() => fetchSuggestions(text), 200);
    } else {
      setShow(false);
    }
  };

  const handleSelect = (item) => {
    onChangeText(item);
    setShow(false);
  };

  return (
    <View style={styles.wrapper}>
      <TextInput
        style={styles.input}
        value={value}
        placeholder={placeholder}
        onChangeText={handleChange}
      />
      {show && (
        <View style={styles.dropdown}>
          <FlatList
            data={filtered}
            keyExtractor={(_, i) => String(i)}
            keyboardShouldPersistTaps="handled"
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.item}
                onPress={() => handleSelect(item)}
              >
                <Text>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { position: 'relative', marginBottom: 16 },
  input: {
    borderWidth: 1, borderColor: '#ccc',
    padding: 8, borderRadius: 4
  },
  dropdown: {
    position: 'absolute', top: 44, left: 0, right: 0,
    backgroundColor: '#fff', borderWidth: 1, borderColor: '#ccc',
    maxHeight: 150, zIndex: 10
  },
  item: { padding: 8, borderBottomWidth: 1, borderColor: '#eee' }
});
