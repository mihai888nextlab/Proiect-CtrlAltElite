import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();

  const pages = [
    {
      name: "Home",
      url: "/home",
    },
    {
      name: "About",
      url: "/about",
    },
    {
      name: "Contact",
      url: "/contact",
    },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 h-[100px] bg-header z-20 flex items-center justify-center">
      <title></title>
      <nav className="w-[1200px] h-full grid grid-cols-3 items-center">
        <div>
          <h1 className="text-background text-2xl font-bold">
            Social<span className="text-primary">Sync</span>
          </h1>
        </div>
        <ul className="flex items-center justify-center">
          {pages.map((page) => (
            <li className="inline-block mx-4" key={page.url}>
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
          <button className="font-semibold text-background px-4 py-2 rounded-lg mr-4 hover:bg-secondary" onClick={() => router.push("/login")}>
            Log In
          </button>
          <button className="font-semibold bg-primary text-background px-8 py-4 rounded-xl hover:bg-secondary" onClick={() => router.push("/signin")}>
            Sign Up
          </button>
        </div>
      </nav>
    </header>
  );
}
