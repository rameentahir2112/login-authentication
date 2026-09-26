import jwt from "jsonwebtoken";
import express from "express";
import bcrypt from "bcrypt";
import { supabase } from "../supabase";

const router = express.Router();
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check required fields
    if (!email || !password) {
      return res.status(400).json({
        message: "Please enter your email and password.",
      });
    }

    // Find user by email
    const { data: user, error: userError } = await supabase
      .from("users")
      .select("id, username, email, password")
      .eq("email", email)
      .maybeSingle();

    if (userError) {
      console.error(userError);

      return res.status(500).json({
        message: "Unable to check account.",
      });
    }

    // Email doesn't exist
    if (!user) {
      return res.status(404).json({
        message: "Account not created. Please create an account first.",
      });
    }

    // Compare entered password with stored bcrypt hash
    const passwordMatches = await bcrypt.compare(
      password,
      user.password
    );

    // Wrong password
    if (!passwordMatches) {
      return res.status(401).json({
        message: "Password is incorrect.",
      });
    }

    // Login successful
   const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
  return res.status(500).json({
    message: "Authentication configuration is missing.",
  });
}

const token = jwt.sign(
  {
    id: user.id,
    email: user.email,
    username: user.username,
  },
  jwtSecret,
  {
    expiresIn: "1d",
  }
);

res.cookie("auth_token", token, {
  httpOnly: true,
  secure: false,
  sameSite: "lax",
  maxAge: 24 * 60 * 60 * 1000,
});

return res.status(200).json({
  message: "Login successful!",
  user: {
    id: user.id,
    username: user.username,
    email: user.email,
  },
});
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      message: "Something went wrong.",
    });
  }
});
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check required fields
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Please fill in all fields.",
      });
    }

    // Basic email validation
    if (!email.includes("@")) {
      return res.status(400).json({
        message: "Please enter a valid email address.",
      });
    }

    // Password validation
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters.",
      });
    }

    // Check if email already exists
    const { data: existingUser, error: existingUserError } =
      await supabase
        .from("users")
        .select("id")
        .eq("email", email)
        .maybeSingle();

    if (existingUserError) {
      console.error(existingUserError);

      return res.status(500).json({
        message: "Unable to check account.",
      });
    }

    if (existingUser) {
      return res.status(409).json({
        message: "An account with this email already exists.",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into Supabase
    const { data: newUser, error: insertError } = await supabase
      .from("users")
      .insert([
        {
          username,
          email,
          password: hashedPassword,
        },
      ])
      .select("id, username, email")
      .single();

    if (insertError) {
      console.error(insertError);

      return res.status(500).json({
        message: "Unable to create account.",
      });
    }

    return res.status(201).json({
      message: "Account created successfully!",
      user: newUser,
    });
  } catch (error) {
    console.error("Registration error:", error);

    return res.status(500).json({
      message: "Something went wrong.",
    });
  }
});

// LOGIN ROUTE
router.get("/me", async (req, res) => {
  try {
    const token = req.cookies.auth_token;

    if (!token) {
      return res.status(401).json({
        message: "Not logged in.",
      });
    }

    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      return res.status(500).json({
        message: "Authentication configuration is missing.",
      });
    }

    const decoded = jwt.verify(token, jwtSecret);

    return res.status(200).json({
      message: "User is logged in.",
      user: decoded,
    });
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired session.",
    });
  }
});
router.post("/logout", (req, res) => {
  res.clearCookie("auth_token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });

  return res.status(200).json({
    message: "Logged out successfully.",
  });
});
export default router;