// App.tsx

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "./src/screens/Home";
import VerReceitaTabs from "./src/routes/VerReceita.routes";
import CriarReceita from "./src/screens/CriarReceita";
import { useEffect } from "react";
import { testarAsyncStorage } from "./src/storage/test";
import DetalhesReceita from "./src/screens/DetalhesReceita";

export type RootStackParamList = {
  Home: undefined;
  VerReceitaTabs: undefined; 
  CriarReceita: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {

  useEffect(() => {
  testarAsyncStorage();
}, []);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="VerReceitaTabs" component={VerReceitaTabs} options={{title: ''}} />
        <Stack.Screen name="CriarReceita" component={CriarReceita} options={{ title: '' }} />
        <Stack.Screen
    name="DetalhesReceita"
    component={DetalhesReceita}
    options={{ title: 'Detalhes da Receita' }}
  />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
