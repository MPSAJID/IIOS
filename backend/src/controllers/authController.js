const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const prisma = require('../prisma/client') // Importing the Prisma client 
const { registerSchema, loginSchema } = require('../utils/validator');
const jwtsecret = process.env.JWT_SECRET;

// Register a new user
const register = async (req, res) => {
  try {
    const parsed = registerSchema.safeParse(req.body);//using zod to validate the request body
    if (!parsed.success) {
      res.status(400).json(parsed.error);
      return;
    }

    const { name, email, password, role } = parsed.data;

    const existing = await prisma.user.findUnique({ where: { email } });// Check if the email already exists with prisma
    if (existing) {
      res.status(400).json({ error: 'Email already exists' });
      return;
    }

    const hashed = await bcrypt.hash(password, 10);// Hash the password using bcrypt
    const user = await prisma.user.create({
      data: { name, email, password: hashed, role },
    });

    res.status(201).json({
      message: 'User created',
      user: { id: user.id, name: user.name, email: user.email },//sending the created user data
    });
  } catch (err) {
    res.status(500).json({ error: 'Registration failed' });
  }
};

// Login a user and generate a JWT token
 const login = async (req, res) => {
  try {
    const parsed = loginSchema.safeParse(req.body);//using zod to validate the request body
    if (!parsed.success) {
      res.status(400).json(parsed.error);
      return;
    }

    const { email, password } = parsed.data; 

    const user = await prisma.user.findUnique({ where: { email } });// Check if the user exists with prisma
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);// Compare the password with the hashed password using bcrypt
    if (!isPasswordValid) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }
    // Generate a JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      jwtsecret,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
    });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
};


// Logout a user
const logout = async (req, res) => {
    try {
      // Invalidate the token by instructing the client to remove it
      res.status(200).json({
        message: 'Logout successful',
      });
    } catch (err) {
      res.status(500).json({ error: 'Logout failed' });
    }
  };

  module.exports = {
    register,
    login,
    logout,
  };