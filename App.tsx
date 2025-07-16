// App.tsx

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "./src/screens/Home";
import VerReceitaTabs from "./src/routes/VerReceita.routes";
import CriarReceita from "./src/screens/CriarReceita";

export type RootStackParamList = {
  Home: undefined;
  VerReceitaTabs: undefined; 
  CriarReceita: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="VerReceitaTabs" component={VerReceitaTabs} options={{title: ''}} />
        <Stack.Screen name="CriarReceita" component={CriarReceita} options={{ title: '' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
