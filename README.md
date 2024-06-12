# Teste técnico Go & Slay

### Como rodar o projeto

Clone o projeto utilizando o comando:

```
git clone https://github.com/fadiinho/goandslay-test
```

> Nota: é necessário ter `git` instalado para usar o comando acima

Tenha instalado node e npm, ou yarn.

Instale as dependências executando:

```bash
yarn install
# ou
npm i
```

Após instalar as dependências, execute a aplicação com:

```bash
yarn start
# ou
npm run dev
```

### Documentação da API

`GET /users` - retorna todos os usuários do banco de dados

#### Exemplo de retorno:

200 - OK
```json
[
	{
		"id": "ddad3864-bf76-4c6d-91d0-e6bfbdc34343",
		"name": "Fadiinho",
		"email": "ffadiinho@gmail.com",
		"age": 20
	},
	{
		"id": "dadff5fb-c046-4294-b1d6-d46b39b58063",
		"name": "John",
		"email": "john@hotmail.com",
		"age": 42
	},
	...
]
```

---

`GET /users/:id` - retorna um usuário específico

#### Exemplo de retorno em caso de sucesso:

200 - OK
```json
{
	"id": "dadff5fb-c046-4294-b1d6-d46b39b58063",
	"name": "John",
	"email": "john@hotmail.com",
	"age": 42
}
```

#### Exemplos de retorno em caso de falha.

Usuário não existe:

404 - Not Found
```json
{
	"error": "User not found"
}
```

---

`POST /users` - cria um novo usuário

Corpo da Requisição:
| Campo | Tipo | Obrigatório |
| ----- | ---- | ----------- |
| Name | String | Sim |
| Email | String | Sim |
| Age | Number | Sim |

#### Exemplo de retorno em caso de sucesso:

201 - Created
```json
{
	"id": "ddad3864-bf76-4c6d-91d0-e6bfbdc34343",
	"name": "Fadiinho",
	"email": "ffadiinho@gmail.com",
	"age": 20
}
```

#### Exemplos de retorno em caso de falha.

Usuário já existe:

409 - Conflict
```json
{
	"error": "User already exists"
}
```

Campos obrigatórios ausentes:

400 - Bad Request
```json
{
	"error": "Missing required fields"
}
```

Email inválido:

400 - Bad Request
```json
{
	"error": "Email is not valid"
}
```

Idade menor ou igual a zero:

400 - Bad Request
```json
{
	"error": "Age must be a positive number"
}
```

---

`PUT /users/:id` - atualiza um usuário

Corpo da Requisição:
| Campo | Tipo | Obrigatório |
| ----- | ---- | ----------- |
| Name | String | Não |
| Email | String | Não |
| Age | Number | Não |

#### Exemplo de retorno em caso de sucesso:

200 - OK 
```json
{
	"id": "ddad3864-bf76-4c6d-91d0-e6bfbdc34343",
	"name": "Fadiinho",
	"email": "ffadiinho@gmail.com",
	"age": 21
}
```

#### Exemplos de retorno em caso de falha.

Usuário não existe:

404 - Not Found
```json
{
	"error": "User not found"
}
```

Se todos os campos estiverem ausentes:

400 - Bad Request
```json
{
	"error": "At least one field is required to update"
}
```

Email inválido:

400 - Bad Request
```json
{
	"error": "Email is not valid"
}
```

Idade menor ou igual a zero:

400 - Bad Request
```json
{
	"error": "Age must be a positive number"
}
```

Email já existe:

409 - Conflict
```json
{
	"error": "User with given email already exists"
}
```

---

`DELETE /users/:id` - deleta um usuário

#### Exemplo de retorno em caso de sucesso:

204 No Content -

#### Exemplos de retorno em caso de falha.

Usuário não existe:

404 - Not Found
```json
{
	"error": "User not found"
}
```
