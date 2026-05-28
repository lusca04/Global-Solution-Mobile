# Global Solution API

API backend do projeto Global Solution.

## Descrição

Esta aplicação é um backend em Spring Boot 4 utilizando Java 17 e H2 em memória para persistência.
Ela oferece endpoints para gerenciar:

- Sistemas monitorados
- Sensores
- Alertas críticos
- Eventos operacionais

## Tecnologias

- Java 17
- Spring Boot 4
- Spring MVC
- Spring Data JPA
- H2 Database
- Lombok
- Maven

## Como executar

1. Abra um terminal na pasta `global-solution-api`.
2. Execute o comando:

```powershell
./mvnw spring-boot:run
```

ou no Windows:

```powershell
.\mvnw.cmd spring-boot:run
```

A API será iniciada em `http://localhost:8080`.

## Comandos úteis

- Compilar o projeto:

```powershell
./mvnw clean package
```

- Executar testes:

```powershell
./mvnw test
```

## Endpoints principais

Base dos endpoints: `http://localhost:8080/api`

- `GET /api/sistemas`
- `GET /api/sistemas/{id}`
- `GET /api/sistemas/status/{status}`
- `POST /api/sistemas`
- `PUT /api/sistemas/{id}`
- `DELETE /api/sistemas/{id}`

- `GET /api/sensores`
- `GET /api/sensores/{id}`
- `GET /api/sensores/ativos`
- `GET /api/sensores/tipo/{tipo}`
- `POST /api/sensores`
- `PUT /api/sensores/{id}`
- `DELETE /api/sensores/{id}`

- `GET /api/alertas`
- `GET /api/alertas/{id}`
- `GET /api/alertas/nao-resolvidos`
- `GET /api/alertas/nivel/{nivel}`
- `POST /api/alertas`
- `PATCH /api/alertas/{id}/resolver`
- `PUT /api/alertas/{id}`
- `DELETE /api/alertas/{id}`

- `GET /api/eventos`
- `GET /api/eventos/{id}`
- `GET /api/eventos/tipo/{tipo}`
- `POST /api/eventos`
- `PUT /api/eventos/{id}`
- `DELETE /api/eventos/{id}`

## Observações

- Ajuste as configurações de rede da interface móvel para conectar ao `localhost` do seu dispositivo, se necessário.
