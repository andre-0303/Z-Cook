import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { Receita, addReceita, getReceitas } from '../storage/receitasStorage';

const categorias = ['Doce', 'Salgado', 'Rápido', 'Fit', 'Outros'] as const;

const gerarId = () => Math.random().toString(36).substring(2, 10);

export default function CriarReceita() {
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
      const receitasAtualizadas = await getReceitas();
console.log('Receitas no AsyncStorage:', receitasAtualizadas);
      Alert.alert('Sucesso', 'Receita salva!');
      // Resetar formulário
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
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>📄 Nome da Receita:</Text>
      <TextInput style={styles.input} value={titulo} onChangeText={setTitulo} placeholder="Nome" />

      <Text style={styles.label}>🕒 Tempo de Preparo (min):</Text>
      <TextInput
        style={styles.input}
        value={tempoPreparo}
        onChangeText={setTempoPreparo}
        keyboardType="numeric"
        placeholder="Ex: 30"
      />

      <Text style={styles.label}>👥 Porções:</Text>
      <TextInput
        style={styles.input}
        value={porcoes}
        onChangeText={setPorcoes}
        keyboardType="numeric"
        placeholder="Ex: 4"
      />

      <Text style={styles.label}>🍽️ Categoria:</Text>
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

      <Text style={styles.label}>🥣 Ingredientes:</Text>
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
        <Text style={styles.btnAddText}>➕ Adicionar ingrediente</Text>
      </TouchableOpacity>

      <Text style={styles.label}>📋 Modo de Preparo:</Text>
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
        <Text style={styles.btnAddText}>➕ Adicionar passo</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.btnSalvar, favorito && { backgroundColor: '#e91e63' }]}
        onPress={() => setFavorito(!favorito)}
      >
        <Text style={styles.btnSalvarText}>{favorito ? '❤️ Favorito' : '♡ Marcar como favorito'}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btnSalvar} onPress={handleSalvar}>
        <Text style={styles.btnSalvarText}>🔘 Salvar Receita</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 50,
  },
  label: {
    fontWeight: '600',
    marginBottom: 6,
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    marginBottom: 12,
  },
  categoriasContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  categoriaBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#888',
    marginRight: 8,
    marginBottom: 8,
  },
  categoriaSelected: {
    backgroundColor: '#4caf50',
    borderColor: '#4caf50',
  },
  categoriaText: {
    color: '#555',
  },
  categoriaTextSelected: {
    color: '#fff',
    fontWeight: '700',
  },
  btnAdd: {
    marginBottom: 16,
  },
  btnAddText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  btnSalvar: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 12,
  },
  btnSalvarText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});
