export default function Header() {
  const pages = [
    {
      name: "Home",
      url: "#",
    },
    {
      name: "About",
      url: "#",
    },
    {
      name: "Contact",
      url: "#",
    },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 h-[100px] bg-header z-20 flex items-center justify-center">
      <nav className="w-[1200px] h-full grid grid-cols-3 items-center">
        <div>
          <h1 className="text-background text-2xl font-bold">
            Social<span className="text-primary">Sync</span>
          </h1>
        </div>
        <ul className="flex items-center justify-center">
          {pages.map((page) => (
            <li className="inline-block mx-4">
              <a
                href={page.url}
                className="text-background hover:text-primary text-lg font-semibold"
              >
                {page.name}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex justify-end">
          <button className="font-semibold text-background px-4 py-2 rounded-lg mr-4 hover:bg-secondary">
            Log In
          </button>
          <button className="font-semibold bg-primary text-background px-8 py-4 rounded-xl hover:bg-secondary">
            Sign Up
          </button>
        </div>
      </nav>
    </header>
  );
}
