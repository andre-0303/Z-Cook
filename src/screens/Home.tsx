import { View, Text, Button } from "react-native"
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from "../../App"
import { useNavigation } from "@react-navigation/native"

type HomeScreenProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function Home() {

    const navigation = useNavigation<HomeScreenProp>();

    return (
        <View>
            <Text>Home</Text>
            <Button 
                title="Ver minhas receitas"
                onPress={() => navigation.navigate('VerReceita')}
            />
            <Button 
                title="Criar nova receita"
                onPress={() => navigation.navigate('CriarReceita')}
            />
        </View>
    )
}