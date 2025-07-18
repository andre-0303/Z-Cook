import React, { useEffect, useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput
} from 'react-native';
import { getReceitas, Receita } from '../storage/receitasStorage';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

  async function handleExcluir(id: string) {
    const novaLista = receitas.filter(r => r.id !== id);
    await AsyncStorage.setItem('@zcook_receitas', JSON.stringify(novaLista));
    setReceitas(novaLista);
  }

  function filtrarReceita() {
    return receitas
      .filter(filtrarPorCategoria)
      .filter(receita => receita.titulo.toLowerCase().includes(busca.toLowerCase()));
  }

  function renderCard(receita: Receita) {
    return (
      <View key={receita.id} style={styles.card}>
        <Text style={styles.cardTitulo}>
          <Ionicons name="restaurant" size={20} color="#333" /> {receita.titulo}
        </Text>
        <Text style={styles.cardInfo}>
          <Ionicons name="time-outline" size={16} color="#555" /> {receita.tempo_preparo} min
          {receita.favorito && <Ionicons name="heart" size={16} color="#e91e63" style={{ marginLeft: 10 }} />}
        </Text>
        <View style={styles.cardAcoes}>
          <TouchableOpacity onPress={() => navigation.navigate('DetalhesReceita', { receita })}>
            <Text><Ionicons name="document-outline" size={16} color="#000" /> Ver detalhes</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('EditarReceita', { id: receita.id })}>
            <Text style={styles.link}><Ionicons name="create-outline" size={16} color="#007AFF" /> Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleExcluir(receita.id)}>
            <Text style={[styles.link, { color: 'red' }]}><Ionicons name="trash-outline" size={16} color="red" /> Excluir</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.buscaContainer}>
        <Ionicons name="search-outline" size={20} color="#555" style={styles.iconBusca} />
        <TextInput
          style={styles.inputBusca}
          placeholder="Buscar receita..."
          value={busca}
          onChangeText={setBusca}
          placeholderTextColor="#888"
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
              {cat === 'Doce' && <Ionicons name="ice-cream" size={16} color="#fff" />}
              {cat === 'Salgado' && <Ionicons name="pizza" size={16} color="#fff" />}
              {cat === 'Rápido' && <Ionicons name="flash-outline" size={16} color="#fff" />}
              {cat === 'Fit' && <Ionicons name="nutrition" size={16} color="#fff" />}
              {cat === 'Outros' && <Ionicons name="restaurant" size={16} color="#fff" />}
              {cat === 'Todas' && <Ionicons name="grid-outline" size={16} color="#fff" />}
              {' '}
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View>
        <Text style={{marginBottom: 15, fontSize: 19, fontWeight: '800', marginLeft: 5}}>Receitas:</Text>
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
    backgroundColor: '#FFFACD'
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
   buscaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 2,
    marginBottom: 16,
    gap: 2
  },
  categorias: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
    gap: 6,
    alignItems: 'center',
    justifyContent: 'center'
  },
  categoriaBtn: {
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#888',
    flexDirection: 'row',
    gap: 4,
    backgroundColor: '#BDB76B',
  },
  categoriaSelecionada: {
    backgroundColor: '#EEE8AA',
    borderColor: '#bbb',
  },
  catTxt: {
    color: '#555',
  },
  catTxtSel: {
    color: '#605b5bff',
    fontWeight: 'bold',
  },
  lista: {
    gap: 12,
  },
  card: {
    backgroundColor: '#F7F7F7',
    padding: 16,
    borderRadius: 12,
    elevation: 2,
  },
  cardTitulo: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 6,
  },
  cardInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
    gap: 4,
    color: '#555',
  },
  cardAcoes: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
  },
  link: {
    color: '#a85919ff',
    fontWeight: '600',
  },
});
