import express from "express";
import User from "../models/user.models.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {
  registerValidation,
  loginValidation,
} from "../utils/schemaValidation.js";

// register controller
export const register = async (req, res) => {
  try {
    const parsedData = registerValidation.safeParse(req.body);
    if (!parsedData.success) {
      return res.status(401).json({
        success: false,
        message: "Invalid data",
      });
    }
    // taking data
    const { name, email, password } = parsedData.data;
    // finding user
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({
        message: "email is already register",
      });
    }

    // hashing password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    //  generating token
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.log("User registered failed", error);
  }
};

// login

export const login = async (req, res) => {
  try {
    const parsedData = loginValidation.safeParse(req.body);
    if (!parsedData.success) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const { email, password } = parsedData.data;
    // checking email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not regiserted",
      });
    }
    // compared password
    const matchedPassword = await bcrypt.compare(password, user.password);
    if (!matchedPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // generate token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log("Login failed", error);
    return res.status(500).json({ message: "Server error during login" });
  }
};

// profile
export const profile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Server error fetching profile" });
  }
};
