
import Link from "next/link";

export default function Authentication() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">
        Authentication
      </h1>

      <p className="mt-3 text-gray-600">
        Choose an option to continue
      </p>

      <div className="mt-8 flex gap-4">
        <Link
          href="/authentication/create-account"
          className="rounded-lg bg-black px-6 py-3 text-white"
        >
          Create Account
        </Link>

        <Link
          href="/authentication/login"
          className="rounded-lg border px-6 py-3"
        >
          Login
        </Link>
      </div>
    </main>
  );
}