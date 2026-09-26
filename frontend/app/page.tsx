import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="flex min-h-[80vh] flex-col items-center justify-center">
        <h1 className="text-4xl font-bold">
          Welcome to MyApp
        </h1>

        <p className="mt-4 text-gray-600">
          Create an account or login to get started.
        </p>

        <Link
          href="/authentication"
          className="mt-6 rounded-lg bg-black px-6 py-3 text-white"
        >
          Get Started
        </Link>
      </main>
    </>
  );
}