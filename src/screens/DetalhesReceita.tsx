import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Receita } from '../storage/receitasStorage';

type RouteParams = {
  DetalhesReceita: {
    receita: Receita;
  };
};

export default function DetalhesReceita() {
  const route = useRoute<RouteProp<RouteParams, 'DetalhesReceita'>>();
  const { receita } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>{receita.titulo}</Text>
      <Text style={styles.info}>⏱️ {receita.tempo_preparo} min</Text>
      <Text style={styles.info}>👥 {receita.porcoes} porções</Text>
      <Text style={styles.info}>🍽️ Categoria: {receita.categoria}</Text>
      <Text style={styles.info}>{receita.favorito ? '❤️ Favorita' : '♡ Não favorita'}</Text>

      <Text style={styles.subtitulo}>🥣 Ingredientes</Text>
      {receita.ingredientes.map((item, index) => (
        <Text key={index} style={styles.item}>• {item}</Text>
      ))}

      <Text style={styles.subtitulo}>📋 Modo de Preparo</Text>
      {receita.modo_preparo.map((passo, index) => (
        <Text key={index} style={styles.item}>{index + 1}. {passo}</Text>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  info: {
    fontSize: 16,
    marginBottom: 4,
  },
  subtitulo: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  item: {
    fontSize: 16,
    marginBottom: 4,
  },
});
