import { NavigationContainer } from "@react-navigation/native";
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Home from "./src/screens/Home";
import VerReceita from "./src/screens/VerReceita";
import CriarReceita from "./src/screens/CriarReceita";

export type RootStackParamList = {
  Home: undefined;
  VerReceita: undefined;
  CriarReceita: undefined;
}

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="VerReceita" component={VerReceita} options={{ headerTitle: '' }} />
        <Stack.Screen name="CriarReceita" component={CriarReceita} options={{ headerTitle: '' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
