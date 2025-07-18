import React, { useEffect, useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput
} from 'react-native';
import { getReceitas, Receita } from '../storage/receitasStorage';
import { useIsFocused, useNavigation } from '@react-navigation/native';

const categorias = ['Todas', 'Doce', 'Salgado', 'Rápido', 'Fit', 'Outros'] as const;

export default function VerReceitas() {
  
  const [receitas, setReceitas] = useState<Receita[]>([]);
  const [busca, setBusca] = useState('');

  const [categoriaSelecionada, setCategoriaSelecionada] = useState<typeof categorias[number]>('Todas');
  const isFocused = useIsFocused(); 
  const navigation = useNavigation();

  useEffect(() => {
    if (isFocused) carregarReceitas();
  }, [isFocused]);

  async function carregarReceitas() {
    const dados = await getReceitas();
    setReceitas(dados);
  }

  function filtrarPorCategoria(receita: Receita) {
    if (categoriaSelecionada === 'Todas') return true;
    return receita.categoria === categoriaSelecionada;
  }

  function renderCard(receita: Receita) {
    return (
      <View key={receita.id} style={styles.card}>
        <Text style={styles.cardTitulo}>🍽️ {receita.titulo}</Text>
        <Text>⏱️ {receita.tempo_preparo} min {receita.favorito ? ' | ❤️' : ''}</Text>
        <View style={styles.cardAcoes}>
          <TouchableOpacity
  onPress={() => navigation.navigate('DetalhesReceita', { receita })}
>
  <Text>📄 Ver detalhes</Text>
</TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('EditarReceita', { id: receita.id })}>
            <Text style={styles.link}>✏️ Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleExcluir(receita.id)}>
            <Text style={[styles.link, { color: 'red' }]}>🗑️ Excluir</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  async function handleExcluir(id: string) {
    const novaLista = receitas.filter(r => r.id !== id);
    await AsyncStorage.setItem('@zcook_receitas', JSON.stringify(novaLista));
    setReceitas(novaLista);
  }

  function filtrarReceita() {
    return receitas.filter(filtrarPorCategoria).filter(receita => receita.titulo.toLowerCase().includes(busca.toLowerCase()))
  }

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
  <TextInput
    style={styles.inputBusca}
    placeholder="🔍 Buscar receita..."
    value={busca}
    onChangeText={setBusca}
  />
</View>

      <View style={styles.categorias}>
        {categorias.map(cat => (
          <TouchableOpacity
            key={cat}
            style={[styles.categoriaBtn, cat === categoriaSelecionada && styles.categoriaSelecionada]}
            onPress={() => setCategoriaSelecionada(cat)}
          >
            <Text style={cat === categoriaSelecionada ? styles.catTxtSel : styles.catTxt}>
              {cat === 'Doce' ? '🍬 Doces' :
               cat === 'Salgado' ? '🍝 Salgadas' :
               cat === 'Rápido' ? '⚡ Rápidas' :
               cat === 'Fit' ? '🥗 Fit' :
               cat === 'Outros' ? '🍽️ Outros' : '🍽️ Todas'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.lista}>
        {filtrarReceita().map(renderCard)}
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingBottom: 80,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  busca: {
    fontSize: 16,
  },
  filtro: {
    fontSize: 16,
  },
  categorias: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  categoriaBtn: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
    borderColor: '#888',
  },
  categoriaSelecionada: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  catTxt: {
    color: '#555',
  },
  catTxtSel: {
    color: '#fff',
    fontWeight: 'bold',
  },
  lista: {
    gap: 12,
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 12,
    elevation: 2,
  },
  cardTitulo: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 6,
  },
  cardAcoes: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
  },
  link: {
    color: '#007AFF',
    fontWeight: '600',
  },
  btnFlutuante: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 30,
    elevation: 5,
  },
  btnTxt: {
    color: '#fff',
    fontWeight: '700',
  },
  inputBusca: {
  borderWidth: 1,
  borderColor: '#CCC',
  borderRadius: 20,
  paddingHorizontal: 16,
  paddingVertical: 8,
  fontSize: 16,
  backgroundColor: '#fff',
  flex: 1,
},

});
