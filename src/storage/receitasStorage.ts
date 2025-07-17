import AsyncStorage from "@react-native-async-storage/async-storage";

const RECEITAS_KEY = '@zcook_receitas';

export type Receita = {
    id: string;
    titulo: string;
    tempo_preparo: number;
    porcoes: number;
    categoria: 'Doce' | 'Salgado' | 'Rápido' | 'Fit' | 'Outros';
    ingredientes: string[];
    modo_preparo: string[];
    favorito: boolean;
};

export async function getReceitas() {
    try {
        const jsonValue = await AsyncStorage.getItem(RECEITAS_KEY);
        return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (err) {
        console.log('Erro ao carregar receitas', err);
        return [];
    }
}

export async function saveReceitas(receitas: Receita[]) {
    try {
        await AsyncStorage.setItem(RECEITAS_KEY, JSON.stringify(receitas));
    } catch (err) {
        console.log('Erro ao salvar receita', err);
    }
}

export async function addReceita(receita: Receita) {
    const receitas = await getReceitas();
    receitas.push(receita);
    await saveReceitas(receitas);
}