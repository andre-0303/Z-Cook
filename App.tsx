// App.tsx

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "./src/screens/Home";
import VerReceitaTabs from "./src/routes/VerReceita.routes";
import CriarReceita from "./src/screens/CriarReceita";
import { useEffect } from "react";
import { testarAsyncStorage } from "./src/storage/test";
import DetalhesReceita from "./src/screens/DetalhesReceita";
import EditarReceita from "./src/screens/EditarReceita";
import { Receita } from "./src/storage/receitasStorage";

export type RootStackParamList = {
  Home: undefined;
  VerReceitaTabs: undefined; 
  CriarReceita: undefined;
  EditarReceita: {id: string};
  DetalhesReceita: {receita: Receita};
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
        <Stack.Screen name="VerReceitaTabs" component={VerReceitaTabs} options={{title: '', headerStyle: {backgroundColor: '#f8f4c8ff'}}} />
        <Stack.Screen name="CriarReceita" component={CriarReceita} options={{ title: '' }} />
        <Stack.Screen
    name="DetalhesReceita"
    component={DetalhesReceita}
    options={{title: '', headerStyle: {backgroundColor: '#f8f4c8ff'}}}
  />
  <Stack.Screen
  name="EditarReceita"
  component={EditarReceita}
  options={{title: 'Editar Receita', headerStyle: {backgroundColor: '#f8f4c8ff'}}}
/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}
