<<<<<<< HEAD
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userDao from '../dao/user-dao.js';

class AuthAbl {
  static async register({ name, email, password }) {
    const existingUser = await userDao.existsByEmail(email);
    if (existingUser) {
      throw { code: "emailExists", message: "Email already exists" };
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = { name, email, password: hashedPassword };
    await userDao.create(newUser);

    return { message: "User registered successfully" };
  }

  static async login({ email, password }) {
    const user = await userDao.getByEmail(email);
    if (!user) {
      throw { code: "userNotFound", message: "User not found" };
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw { code: "invalidPassword", message: "Invalid password" };
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    return { user: { id: user._id, email: user.email, role: user.role }, token };
  }

  static async getUserProfile(userId) {
    const user = await userDao.findById(userId);
    if (!user) {
      throw { code: "userNotFound", message: "User not found" };
    }
    }
}

export default AuthAbl;
=======
const userDao = require("../dao/user-dao")
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");

class authAbl{
   async register(req , res){
        const { name, email, password } = req.body;

        try {
          // Zkontroluj, jestli uživatel existuje
          const existingUser = await User.findOne({ email });
          if (existingUser) {
            return res.status(400).json({ message: "Email už existuje" });
          }
      
          // Hashování hesla
          const hashedPassword = await bcrypt.hash(password, 12);
      
          // Uložení uživatele do databáze
          const newUser = new User({
            name,
            email,
            password: hashedPassword,
          });
          
          await userDao.create(newUser)
          res.status(201).json({ message: "Uživatel vytvořen" });
        } catch (err) {
          res.status(500).json({ message : err.message});
        }
    }

   async login(req , res){
    const { email, password } = req.body;

    try {
      // Najdi uživatele podle emailu
      const user = userDao.getByEmail(email)
      if (!user) {
        return res.status(404).json({ message: "Uživatel nenalezen" });
      }
  
      // Ověření hesla
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Nesprávné heslo" });
      }
  
      // Vytvoření JWT tokenu
      const token = jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );
  
      res.status(200).json({ token, user: { id: user._id, email: user.email, role: user.role } });
    } catch (err) {
      res.status(500).json({ message: "Chyba serveru" });
    }
    }
}

module.exports = authAbl
>>>>>>> 2b8748c (ServerFolder + connect backend login/register)
