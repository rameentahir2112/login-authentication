"use client";

import { useState } from "react";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const [message, setMessage] = useState("");
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  setMessage("");

  if (!email || !password) {
    setMessage("Please enter your email and password.");
    return;
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      setMessage(data.message);
      return;
    }

    setMessage(data.message);

    window.location.href = "/dashboard";
  } catch (error) {
    console.error("Login error:", error);
    setMessage("Unable to connect to the server.");
  }
};

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">Login</h1>

      <form
        onSubmit={handleSubmit}
        className="mt-8 flex w-full max-w-md flex-col gap-4"
      >
        <div>
          <label htmlFor="email">Email</label>

          <input
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>

          <input
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-lg border p-3"
          />
        </div>

        <button
          type="submit"
          className="rounded-lg bg-black px-6 py-3 text-white"
        >
          Login
        </button>

        {message && (
          <p className="text-center text-sm text-red-600">
            {message}
          </p>
        )}
      </form>

      <Link
        href="/authentication/create-account"
        className="mt-6 text-gray-600 underline"
      >
        Don&apos;t have an account? Create Account
      </Link>
    </main>
  );
}