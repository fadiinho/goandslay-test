import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const app = express();
app.use(express.json());

/**
 * @typedef User
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {number} age */

/** @type{Map.<string, User>} */
const users = new Map();

// Criar Usuário
app.post('/users', (req, res) => {
  const { name, email, age } = req.body;

  if (!!users.get(email)) {
    res.status(409).json({
      error: "User already exists"
    });
    return;
  }

  /** @type{User} */
  const user = { id: uuidv4(), name, email, age };

  users.set(user.id, user);
  console.debug(users);

  res.status(201).json(user);
});

// Listar Usuários
app.get('/users', (req, res) => {
  res.json(Array.from(users.values()));
});

// Obter Usuário por ID
app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    const user = users.find(u => u.id === id);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
});

// Atualizar Usuário
app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name, email, age } = req.body;
    const userIndex = users.findIndex(u => u.id === id);
    if (userIndex === -1) {
        return res.status(404).json({ error: 'User not found' });
    }
    const updatedUser = { id, name, email, age };
    users[userIndex] = updatedUser;
    res.json(updatedUser);
});

// Deletar Usuário
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const userIndex = users.findIndex(u => u.id === id);
    if (userIndex === -1) {
        return res.status(404).json({ error: 'User not found' });
    }
    users.splice(userIndex, 1);
    res.status(204).send();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
