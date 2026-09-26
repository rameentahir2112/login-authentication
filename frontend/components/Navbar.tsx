export default function Navbar() {
  return (
    <nav className="flex items-center justify-between border-b px-8 py-4">
      <h2 className="text-xl font-bold">MyApp</h2>

      <div className="flex gap-6 text-gray-600">
        <span>Home</span>
        <span>About</span>
        <span>Contact</span>
      </div>
    </nav>
  );
}