# Global Solution Mobile

Repositório que reúne dois projetos do ecossistema Global Solution:

- `global-solution-api`: backend em Spring Boot
- `global-solution-interface`: app mobile em Expo/React Native

## Visão geral

O backend oferece serviços REST para gerenciar sistemas monitorados, sensores, alertas e eventos.
A interface consome esses serviços e apresenta os dados em uma aplicação móvel.

## ALUNOS 
Lucas Santos Rodrigues RM 556891
Gustavo Andrade de Sousa RM 559069

## Estrutura do repositório

- `global-solution-api/`
  - Projeto Java Spring Boot
  - Endpoints REST sob `http://localhost:8080/api`
- `global-solution-interface/`
  - App Expo React Native
  - Consome o backend por meio de chamadas HTTP

## Como começar

### Backend

```powershell
cd global-solution-api
.\mvnw.cmd spring-boot:run
```

### Interface

```powershell
cd global-solution-interface
npm install
npm start
```

## Notas de integração

- O app móvel precisa apontar para o backend correto em `global-solution-interface/src/services/api.ts`.
- Se estiver usando um emulador Android, `http://10.0.2.2:8080` é o endereço recomendado.
- Em um dispositivo físico, use o IP da máquina onde o backend está rodando.

## Links rápidos

- `global-solution-api/README.md`
- `global-solution-interface/README.md`
