import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { userEmailExists, isValidEmail } from './utils.js';

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

  if (!name || !email || !age) {
    return res.status(400).json({
      error: "Missing required fields"
    });
  };

  if (!isValidEmail(email)) {
    return res.status(400).json({
      error: "Email is not valid"
    });
  };

  if (age <= 0) {
    return res.status(400).json({
      error: "Age must be positive"
    });
  };

  if (userEmailExists(email, users.values())) {
    return res.status(409).json({
      error: "User already exists"
    });
  }

  /** @type{User} */
  const user = { id: uuidv4(), name, email, age };

  users.set(user.id, user);
  res.status(201).json(user);
});

// Listar Usuários
app.get('/users', (_, res) => {
  res.json(Array.from(users.values()));
});

// Obter Usuário por ID
app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  const user = users.get(id);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
});

// Atualizar Usuário
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const user = users.get(id);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  if (!body.name && !body.email && !body.age) {
    return res.status(400).json({
      error: "At least one field is required to update"
    });
  };

  if (!isValidEmail(body.email)) {
    return res.status(400).json({
      error: "Email is not valid"
    });
  };

  if (body.age <= 0) {
    return res.status(400).json({
      error: "Age must be positive"
    });
  };

  if (userEmailExists(body.email, users.values())) {
    return res.status(409).json({
      error: "User with given email already exists"
    });
  };

  const updatedUser = { ...user, ...body };
  users.set(id, updatedUser);
  res.json(updatedUser);
});

// Deletar Usuário
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  const user = users.get(id);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  users.delete(id);
  res.status(204).send();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
