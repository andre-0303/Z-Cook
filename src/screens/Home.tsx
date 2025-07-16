import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from "../../App";
import { useNavigation } from "@react-navigation/native";

type HomeScreenProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function Home() {
    const navigation = useNavigation<HomeScreenProp>();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Z-Cook</Text>
            <Text style={styles.subtitle} numberOfLines={1} ellipsizeMode="tail">O app perfeito para você guardar suas receitas</Text>

            <Image source={require('../../assets/download.jpeg')} style={{width: 250, height: 160, borderRadius: 12, marginBottom: 30}}/>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('VerReceita')}
                activeOpacity={0.8}
            >
                <Text style={styles.buttonText}>Ver minhas receitas</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.button, styles.secondaryButton]}
                onPress={() => navigation.navigate('CriarReceita')}
                activeOpacity={0.8}
            >
                <Text style={styles.buttonText}>Criar nova receita</Text>
            </TouchableOpacity>
            
            <Text style={styles.titledown}>Suas receitas em um só lugar.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 19,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFACD',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#000',
    },
    subtitle: {
        fontSize: 15,
        marginBottom: 15,
    },
    titledown: {
        fontSize: 13,
        marginTop: 20,
    },
    button: {
        backgroundColor: '#FFDAB9', 
        paddingVertical: 14,
        paddingHorizontal: 28,
        borderRadius: 20,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#000',
        elevation: 5,
        width: '80%',
        alignItems: 'center',
    },
    secondaryButton: {
        backgroundColor: '#EEE8AA', 
    },
    buttonText: {
        color: '#000',
        fontSize: 13,
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
});
