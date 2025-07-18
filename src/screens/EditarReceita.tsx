import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Receita, getReceitas, saveReceitas } from '../storage/receitasStorage';
import { Ionicons } from '@expo/vector-icons';

type Params = {
  id: string;
};

export default function EditarReceita() {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<{ params: Params }, 'params'>>();
  const { id } = route.params;

  const [titulo, setTitulo] = useState('');
  const [tempo_preparo, setTempoPreparo] = useState('');
  const [categoria, setCategoria] = useState<Receita['categoria']>('Outros');

  useEffect(() => {
    async function carregar() {
      const lista = await getReceitas();
      const receita = lista.find(r => r.id === id);
      if (receita) {
        setTitulo(receita.titulo);
        setTempoPreparo(String(receita.tempo_preparo));
        setCategoria(receita.categoria);
      } else {
        Alert.alert("Erro", "Receita não encontrada.");
        navigation.goBack();
      }
    }

    carregar();
  }, []);

  async function salvarAlteracoes() {
    const lista = await getReceitas();
    const novaLista = lista.map(r => {
      if (r.id === id) {
        return { ...r, titulo, tempo_preparo: Number(tempo_preparo), categoria };
      }
      return r;
    });
    await saveReceitas(novaLista);
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}><Ionicons name="document-text-outline" size={20} /> Título:</Text>
      <TextInput style={styles.input} value={titulo} onChangeText={setTitulo} />

      <Text style={styles.label}><Ionicons name="time-outline" size={20} /> Tempo de Preparo (min):</Text>
      <TextInput style={styles.input} value={tempo_preparo} onChangeText={setTempoPreparo} keyboardType="numeric" />

      <Text style={styles.label}><Ionicons name="restaurant-outline" size={20} /> Categoria:</Text>
      <TextInput style={styles.input} value={categoria} onChangeText={setCategoria} />

      <TouchableOpacity style={styles.btnSalvar} onPress={salvarAlteracoes}>
        <Text style={styles.btnSalvarTxt}>Salvar Alterações</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFACD',
  },
  label: {
    fontWeight: 'bold',
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginTop: 4,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.6)'
  },
  btnSalvar: {
    marginTop: 30,
    backgroundColor: '#BDB76B',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnSalvarTxt: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
