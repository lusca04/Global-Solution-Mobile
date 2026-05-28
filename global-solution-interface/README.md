# Global Solution Interface

App de interface mobile para o projeto Global Solution.

## Descrição

Esta aplicação é uma interface desenvolvida com Expo e React Native para consumir dados do backend.
Ela permite visualizar e cadastrar:

- Sistemas/modules
- Sensores
- Alertas
- Eventos operacionais

## Tecnologias

- Expo
- React Native
- TypeScript
- Axios / Fetch

## Como executar

1. Abra um terminal na pasta `global-solution-interface`.
2. Instale as dependências:

```powershell
npm install
```

3. Inicie o Expo:

```powershell
npm start
```

4. Use o Expo Go ou emulador para executar no Android, iOS ou web.

- Android:
```powershell
npm run android
```
- iOS:
```powershell
npm run ios
```
- Web:
```powershell
npm run web
```

## Configuração da API

O endereço base da API está configurado em `src/services/api.ts`.
Por padrão, está usando `http://10.0.2.2:8080`, que é o endereço correto para rodar um emulador Android no mesmo host.

Se você estiver usando um dispositivo físico ou web, altere o `BASE_URL` para o IP do servidor backend, por exemplo:

```ts
const BASE_URL = 'http://192.168.x.y:8080';
```

## Observações

- O app usa `expo` e requer o Expo CLI instalado localmente ou globalmente.
- Caso conecte a um backend local, verifique se o servidor Spring Boot está em execução antes de iniciar o app.
