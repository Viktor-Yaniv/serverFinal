const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const TOKEN_EXPIRATION_TIME = '24h';
 const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;


    const existingUser = await User.findOne({email});

    if (existingUser !== null) {
      return res.status(400).json({ error: 'User already exists' });
    }
    

    const user = new User({
      name,
      email,
      password,
    });

    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: TOKEN_EXPIRATION_TIME,
    });

    res.status(201).json({ token, user });
  } catch (error) {
   
    res.status(500).json({ error: 'Server error' });
  }
};

const login = async (req, res) => {

  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ error: 'Неверный адрес электронной почты или пароль' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Неверный адрес электронной почты или пароль' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: TOKEN_EXPIRATION_TIME,
    });

    res.status(200).json({ token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};


const me = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    // if (req.user.role !== 'admin') {
    //   return res.status(403).json({ error: 'Access denied' });
    // }

    res.status(200).json(req.user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};


module.exports = {
  register,
  login,
  me
}
