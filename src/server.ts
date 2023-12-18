import express from 'express';
import bodyParser from 'body-parser';
import { register, login, verify } from './controllers/authController';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.post('/register', register);
app.post('/login', login);

app.get('/api/verified/:id',verify);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

