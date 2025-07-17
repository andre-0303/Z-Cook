import AsyncStorage from '@react-native-async-storage/async-storage';

export async function testarAsyncStorage() {
  const testKey = '@zcook_test';
  const testValue = 'Olá Bandeira!';

  await AsyncStorage.setItem(testKey, testValue);

  const resultado = await AsyncStorage.getItem(testKey);

  console.log('Resultado do AsyncStorage:', resultado);
}
