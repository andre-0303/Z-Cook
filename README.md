# ZCook 🍽️

ZCook é um aplicativo de receitas culinárias desenvolvido com **React Native** e **Expo**. Feito com carinho para ajudar pessoas a gerenciarem suas receitas de forma rápida, simples e bonita diretamente do celular. É um caderninho de receitas de avó moderno, todas as receitas em um só lugar.

## ✨ Funcionalidades

- 📄 **Listagem de Receitas**: Visualize todas as suas receitas cadastradas.
- 🔍 **Busca de Receita**: Filtro rápido pelo nome da receita.
- 🥗 **Criação de Receitas**: Adicione novas receitas com título, tempo de preparo, porções, categoria, ingredientes e modo de preparo.
- ✏️ **Edição de Receita**: Atualize qualquer campo de uma receita cadastrada.
- 🗑️ **Exclusão de Receita**: Delete com segurança qualquer receita.
- ❤️ **Favoritar**: Marque suas receitas favoritas para fácil acesso.
- 📋 **Detalhamento Completo**: Veja todos os detalhes da receita de forma estruturada.
- 📁 **Armazenamento Local com AsyncStorage**: Persistência de dados mesmo após fechar o app.
- 🔀 **Navegação com React Navigation**: Stack e tabs para uma navegação fluida.

## 📱 Tecnologias Utilizadas

- **React Native**
- **Expo**
- **TypeScript**
- **React Navigation**
- **AsyncStorage**
- **Ionicons**
- **Figma** (UI/UX)

## 🧪 Como Testar Localmente

⚠️ **Pré-requisitos**: Você precisa ter o **Node.js**, **Expo CLI** e um emulador Android/iOS ou o app **Expo Go** instalado no celular.

1. Clone o repositório:
   ```bash
   git clone https://github.com/andre-0303/Z-Cook.git
   cd zcook
   ```

2. Instale as dependências:
   ```bash
   npm install
   # ou
   yarn install
   ```

3. Rode o projeto:
   ```bash
   npx expo start
   ```

4. Escaneie o QR Code com o aplicativo **Expo Go** ou rode em um emulador Android/iOS.

## 📂 Estrutura de Pastas

```
src/
│
├── screens/              # Telas do aplicativo
├── routes/               # Configuração das rotas (tabs)
├── storage/              # AsyncStorage e manipulação de dados
```

## 🎯 Próximos Passos (Ideias Futuras)

- Implementar categorias filtráveis (ex.: "Sobremesa", "Almoço", etc.)
- Compartilhar receitas via link
- Upload de imagens das receitas
- Integração com banco de dados (ex.: Supabase, Firebase ou PostgreSQL no Neon)
- Tela de login e autenticação

## 📸 UI/UX Design

Confira o design no Figma:  
👉 [Telas](https://www.figma.com/design/ZVUw2lOc2AlVOPiyF2Oicb/ZCook?node-id=10-8&t=4sii4XZrbVvGU3zd-1)

---

Feito por André Bandeira
