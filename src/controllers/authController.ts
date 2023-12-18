import { Request, Response } from 'express';
import { registerUser, loginUser, verifiedUser } from '../services/authService';

export const register = async (req: Request, res: Response) => {
  const { username, password, email } = req.body;
debugger
  try {
    const result = await registerUser(username, password, email);
    res.status(200).send(result);
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).send('Error registering user');
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const result = await loginUser(username, password);
    res.status(200).send(result);
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).send('Error logging in');
  }
};

export const verify = async (req: Request, res: Response) => {
  const resourceId = req.params.id;

  try {
    // const result = await loginUser(username, password);
    const result = await verifiedUser(resourceId)
    res.status(200).send(result);
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).send('Error logging in');
  }
};
