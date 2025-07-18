import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import VerReceita from '../screens/VerReceita';
import CriarReceita from '../screens/CriarReceita';
import { Ionicons } from '@expo/vector-icons'; 
import { View, Text } from 'react-native';

const Tab = createBottomTabNavigator();

export default function VerReceitaTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any;

          if (route.name === 'VerReceita') {
            iconName = focused ? 'book' : 'book-outline';
          } else if (route.name === 'CriarReceita') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#000',
        tabBarStyle: {
          backgroundColor: '#EEE8AA',
          borderTopWidth: 0,
          elevation: 10,
          height: 95
        },
        tabBarInactiveTintColor: 'gray',
        headerShown: false
      })}
    >
      <Tab.Screen name="VerReceita" component={VerReceita} options={{tabBarLabel: 'Receitas'}} />
      <Tab.Screen name="CriarReceita" component={CriarReceita} options={{tabBarLabel: 'Adicionar'}} />
    </Tab.Navigator>
  );
}
