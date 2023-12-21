import { Request, Response } from 'express';
import { registerUser, loginUser, verifiedUser } from '../services/authService';
import { checkUser } from '../services/userServices';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const register = async (req: Request, res: Response) => {
  const { username, password, email } = req.body;
debugger
  try {
    const checkUsers = await checkUser(username,email);
    console.log(checkUsers);
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
    if(result ==="Login successful"){
       // Example usage
      const secretKey = 'apa yang kamu cari disini ? tolol 123 !!!';
      const hashedPassword = await bcrypt.hash(secretKey, 10);
      const payload = { email: username, password: btoa(hashedPassword) };

      // Generate a token
      const token = jwt.sign(payload, secretKey, { expiresIn: '1d' });

      const response = {
        data: {token:token}, // Your preview data goes here
        message: 'Login successful',
        status: true,
      };
      res.status(200).send(response);
    }
    else if(result==="Incorrect password"){
      const response = {
        data: [], // Your preview data goes here
        message: 'Incorrect password',
        status: false,
      };
      res.status(403).send(response);
    }
    else if(result ==="User not found"){
      const response = {
        data: [], // Your preview data goes here
        message: 'User not found',
        status: false,
      };
      res.status(404).send(response);
    }
    else{
      console.log("error");
    }
    
  } catch (error) {
    console.error('Login error:', error);
    if(error ==="Incorrect password"){

    }
    // // Create a response structure with preview data
    const response = {
      data: [], // Your preview data goes here
      message: 'Error login',
      status: false,
    };

    res.status(500).send(response);
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
