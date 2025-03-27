function Navbar() {
  return (
    <header className="font-light bg-emerald-600 shadow-md p-4 flex justify-between items-center">
      <h1 className="text-3xl text-white hover:text-emerald-800 transition-colors duration-200">
        cubetutor
      </h1>
      <nav className="flex space-x-6">
        <a
          href="#"
          className="text-white hover:text-emerald-800 transition-colors duration-200"
        >
          Scan
        </a>
        <a
          href="#"
          className="text-white hover:text-emerald-800 transition-colors duration-200"
        >
          Import
        </a>
      </nav>
    </header>
  );
}

export default Navbar;
