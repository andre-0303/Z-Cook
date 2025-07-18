import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Receita } from '../storage/receitasStorage';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

type RouteParams = {
  DetalhesReceita: {
    receita: Receita;
  };
};

export default function DetalhesReceita() {
  const route = useRoute<RouteProp<RouteParams, 'DetalhesReceita'>>();
  const { receita } = route.params;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f1edcad0' }}>
      <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>{receita.titulo}</Text>

      <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <Ionicons name="time-outline" size={20} color="#555" />
          <Text style={styles.infoText}>{receita.tempo_preparo} min</Text>
        </View>

        <View style={styles.infoItem}>
          <Ionicons name="people-outline" size={20} color="#555" />
          <Text style={styles.infoText}>{receita.porcoes} porções</Text>
        </View>

        <View style={styles.infoItem}>
          <Ionicons name="restaurant-outline" size={20} color="#555" />
          <Text style={styles.infoText}>{receita.categoria}</Text>
        </View>

        <View style={styles.infoItem}>
          <Ionicons
            name={receita.favorito ? 'heart' : 'heart-outline'}
            size={20}
            color={receita.favorito ? 'red' : '#555'}
          />
          <Text style={styles.infoText}>
            {receita.favorito ? 'Favorita' : 'Não favorita'}
          </Text>
        </View>
      </View>

      <Text style={styles.subtitulo}>
        <MaterialIcons name="kitchen" size={20} color="#333" /> Ingredientes
      </Text>
      {receita.ingredientes.map((item, index) => (
        <Text key={index} style={styles.item}>• {item}</Text>
      ))}

      <Text style={styles.subtitulo}>
        <FontAwesome5 name="clipboard-list" size={18} color="#333" /> Modo de Preparo
      </Text>
      {receita.modo_preparo.map((passo, index) => (
        <Text key={index} style={styles.item}>{index + 1}. {passo}</Text>
      ))}
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#FFFACD',
    paddingBottom: 40,
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  infoContainer: {
    marginBottom: 20,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  infoText: {
    fontSize: 16,
    color: '#555',
  },
  subtitulo: {
    fontSize: 17,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
    color: '#000',
    flexDirection: 'row',
    alignItems: 'center',
  },
  item: {
    fontSize: 16,
    marginBottom: 6,
    color: '#444',
    paddingLeft: 10,
  },
});
