"use client";

import { useEffect, useState } from "react";

type User = {
  id: string;
  email: string;
  username: string;
};

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
const handleLogout = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`,
      {
        method: "POST",
        credentials: "include",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Logout failed.");
      return;
    }

    alert(data.message);

    window.location.href = "/authentication/login";
  } catch (error) {
    console.error("Logout error:", error);
    alert("Unable to connect to the server.");
  }
};
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`,
          {
            credentials: "include",
          }
        );

        if (!response.ok) {
          setUser(null);
          return;
        }

        const data = await response.json();

        setUser(data.user);
      } catch (error) {
        console.error("Session error:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p>Checking your session...</p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="text-3xl font-bold">
          You are not logged in.
        </h1>

        <a
          href="/authentication/login"
          className="mt-6 rounded-lg bg-black px-6 py-3 text-white"
        >
          Go to Login
        </a>
      </main>
    );
  }

 return (
  <main className="flex min-h-screen flex-col items-center justify-center">
    <h1 className="text-3xl font-bold">
      Welcome, {user.username}! 👋
    </h1>

    <p className="mt-4 text-gray-600">
      You are logged in as {user.email}
    </p>

    <button
      onClick={handleLogout}
      className="mt-6 rounded-lg bg-black px-6 py-3 text-white"
    >
      Logout
    </button>
  </main>
);
}