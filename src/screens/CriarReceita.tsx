import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Keyboard } from 'react-native';
import { Receita, addReceita, getReceitas } from '../storage/receitasStorage';
import { useNavigation } from '@react-navigation/native';
import {Ionicons} from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const categorias = ['Doce', 'Salgado', 'Rápido', 'Fit', 'Outros'] as const;

const gerarId = () => Math.random().toString(36).substring(2, 10);

export default function CriarReceita() {
  const navigation = useNavigation();
  const [titulo, setTitulo] = useState('');
  const [tempoPreparo, setTempoPreparo] = useState('');
  const [porcoes, setPorcoes] = useState('');
  const [categoria, setCategoria] = useState<typeof categorias[number]>('Doce');
  const [ingredientes, setIngredientes] = useState(['']);
  const [modoPreparo, setModoPreparo] = useState(['']);
  const [favorito, setFavorito] = useState(false);

  function handleAddIngrediente() {
    setIngredientes([...ingredientes, '']);
  }

  function handleIngredienteChange(text: string, index: number) {
    const novos = [...ingredientes];
    novos[index] = text;
    setIngredientes(novos);
  }

  function handleAddModoPreparo() {
    setModoPreparo([...modoPreparo, '']);
  }

  function handleModoPreparoChange(text: string, index: number) {
    const novos = [...modoPreparo];
    novos[index] = text;
    setModoPreparo(novos);
  }

  async function handleSalvar() {
    if (!titulo.trim()) {
      Alert.alert('Erro', 'Informe o nome da receita');
      return;
    }
    if (!tempoPreparo || isNaN(Number(tempoPreparo))) {
      Alert.alert('Erro', 'Informe um tempo de preparo válido');
      return;
    }
    if (!porcoes || isNaN(Number(porcoes))) {
      Alert.alert('Erro', 'Informe o número de porções');
      return;
    }

  const novaReceita: Receita = {
  id: gerarId(),
  titulo: titulo.trim(),
  tempo_preparo: Number(tempoPreparo),
  porcoes: Number(porcoes),
  categoria,
  ingredientes: ingredientes.filter(i => i.trim() !== ''),
  modo_preparo: modoPreparo.filter(m => m.trim() !== ''),
  favorito,
};


    try {
      await addReceita(novaReceita);
      Alert.alert('Sucesso', 'Receita salva!');
      navigation.navigate('VerReceitaTabs');
      
      setTitulo('');
      setTempoPreparo('');
      setPorcoes('');
      setCategoria('Doce');
      setIngredientes(['']);
      setModoPreparo(['']);
      setFavorito(false);
    } catch (e) {
      Alert.alert('Erro', 'Falha ao salvar receita');
      console.error(e);
    }
  }

  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === 'ios' ? 'padding': 'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
        <Ionicons name="document-outline" size={24} color="black" />
        <Text style={[styles.label, { marginLeft: 5, marginTop: 5 }]}>Nome da Receita:</Text>
      </View>

      <TextInput style={styles.input} value={titulo} onChangeText={setTitulo} placeholder="Nome" />

      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
        <Ionicons name="time-outline" size={24} color="black" />
        <Text style={[styles.label, { marginLeft: 5, marginTop: 5 }]}>
         Tempo de Preparo (min):</Text>
      </View>
      <TextInput
        style={styles.input}
        value={tempoPreparo}
        onChangeText={setTempoPreparo}
        keyboardType="numeric"
        placeholder="Ex: 30"
      />

     <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
      <Ionicons name="people-outline" size={24} color="black" />
       <Text style={[styles.label, { marginLeft: 5, marginTop: 5 }]}>
         Porções:</Text>
     </View>
      <TextInput
        style={styles.input}
        value={porcoes}
        onChangeText={setPorcoes}
        keyboardType="numeric"
        placeholder="Ex: 4"
      />

      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
        <Ionicons name="fast-food-outline" size={24} color="black" />
        <Text style={[styles.label, { marginLeft: 5, marginTop: 5 }]}>
         Categoria:</Text>
      </View>
      <View style={styles.categoriasContainer}>
        {categorias.map(cat => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.categoriaBtn,
              categoria === cat && styles.categoriaSelected,
            ]}
            onPress={() => setCategoria(cat)}
          >
            <Text style={categoria === cat ? styles.categoriaTextSelected : styles.categoriaText}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
        <MaterialCommunityIcons name="bowl-mix" size={24} color="black" />
        <Text style={[styles.label, { marginLeft: 5, marginTop: 5 }]}>
         Ingredientes:</Text>
      </View>
      {ingredientes.map((ing, i) => (
        <TextInput
          key={i}
          style={styles.input}
          placeholder={`Ingrediente ${i + 1}`}
          value={ing}
          onChangeText={(text) => handleIngredienteChange(text, i)}
        />
      ))}
      <TouchableOpacity style={styles.btnAdd} onPress={handleAddIngrediente}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
          <Ionicons name='add-circle' size={24} color="black" />
          <Text style={[styles.btnAddText, {marginLeft: 5, marginTop: 5 }]}>
           Adicionar ingrediente</Text>
        </View>
      </TouchableOpacity>

      <Text style={styles.label}>
        <MaterialCommunityIcons name="chef-hat" size={24} color="black" />
         Modo de Preparo:</Text>
      {modoPreparo.map((modo, i) => (
        <TextInput
          key={i}
          style={styles.input}
          placeholder={`Passo ${i + 1}`}
          value={modo}
          onChangeText={(text) => handleModoPreparoChange(text, i)}
        />
      ))}
      <TouchableOpacity style={styles.btnAdd} onPress={handleAddModoPreparo}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
          <Ionicons name='add-circle' size={24} color="black" />
          <Text style={[styles.btnAddText, {marginLeft: 5, marginTop: 5 }]}>
           Adicionar passo</Text>
        </View>
      </TouchableOpacity>

        <TouchableOpacity
  style={[
    styles.btnSalvar,
    {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: favorito ? '#e91e63' : '#EEE8AA',
    },
  ]}
  onPress={() => setFavorito(!favorito)}
>
  <Ionicons
    name={favorito ? 'heart' : 'heart-outline'}
    size={22}
    color={favorito ? '#fff' : '#000'}
    style={{ marginRight: 8 }}
  />
  <Text style={[
    styles.btnSalvarText,
    { color: favorito ? '#fff' : '#000' }
  ]}>
    {favorito ? 'Remover dos Favoritos' : 'Marcar como Favorito'}
  </Text>
</TouchableOpacity>

      <TouchableOpacity
  style={[
    styles.btnSalvar,
    {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
  ]}
  onPress={handleSalvar}
>
  <Ionicons
    name="save-outline"
    size={22}
    color="#000"
    style={{ marginRight: 8 }}
  />
  <Text style={[styles.btnSalvarText, { color: '#000' }]}>
    Salvar Receita
  </Text>
</TouchableOpacity>

    </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 50,
    backgroundColor: '#FFFACD',
  },
  label: {
    fontWeight: '600',
    marginBottom: 6,
    fontSize: 16,
    justifyContent:'center',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E3E0E0',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    marginBottom: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.6)'
  },
  categoriasContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  categoriaBtn: {
    paddingHorizontal: 25,
    paddingVertical: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#888',
    marginRight: 8,
    marginBottom: 8,
  },
  categoriaSelected: {
    backgroundColor: '#BDB76B',
    borderColor: '#bbb',
  },
  categoriaText: {
    color: '#555',
    fontWeight: 'bold'
  },
  categoriaTextSelected: {
    color: '#fff',
    fontWeight: '700',
  },
  btnAdd: {
    marginBottom: 16,
  },
  btnAddText: {
    color: '#000',
    fontWeight: '600',
  },
  btnSalvar: {
    backgroundColor: '#EEE8AA',
    borderColor: '#bbb',
    borderWidth: 1,
    paddingVertical: 10,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 12,
  },
  btnSalvarText: {
    color: '#000',
    fontWeight: '700',
    fontSize: 16,
  },
});
