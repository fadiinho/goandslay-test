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

```json
200 Success -
{
	"id": "dadff5fb-c046-4294-b1d6-d46b39b58063",
	"name": "John",
	"email": "john@hotmail.com",
	"age": 42
}
```

#### Exemplos de retorno em caso de falha.

Usuário não existe:

```json
404 Not Found -
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

```json
201 Created -
{
	"id": "ddad3864-bf76-4c6d-91d0-e6bfbdc34343",
	"name": "Fadiinho",
	"email": "ffadiinho@gmail.com",
	"age": 20
}
```

#### Exemplos de retorno em caso de falha.

Usuário já existe:

```json
409 Conflict -
{
	"error": "User already exists"
}
```

Campos obrigatórios ausentes:

```json
400 Bad Request -
{
	"error": "Missing required fields"
}
```

Email inválido:

```json
400 Bad Request -
{
	"error": "Email is not valid"
}
```

Idade menor ou igual a zero:

```json
400 Bad Request -
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

```json
200 Created -
{
	"id": "ddad3864-bf76-4c6d-91d0-e6bfbdc34343",
	"name": "Fadiinho",
	"email": "ffadiinho@gmail.com",
	"age": 21
}
```

#### Exemplos de retorno em caso de falha.

Usuário não existe:

```json
404 Not Found -
{
	"error": "User not found"
}
```

Se todos os campos estiverem ausentes:

```json
400 Bad Request -
{
	"error": "At least one field is required to update"
}
```

Email inválido:

```json
400 Bad Request -
{
	"error": "Email is not valid"
}
```

Idade menor ou igual a zero:

```json
400 Bad Request -
{
	"error": "Age must be a positive number"
}
```

Email já existe:

```json
409 Conflict -
{
	"error": "User with given email already exists"
}
```

---

`DELETE /users/:id` - deleta um usuário

#### Exemplo de retorno em caso de sucesso:

```json
204 No Content -
```

#### Exemplos de retorno em caso de falha.

Usuário não existe:

```json
404 Not Found -
{
	"error": "User not found"
}
```
