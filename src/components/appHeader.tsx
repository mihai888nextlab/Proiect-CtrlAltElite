export default function AppHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 h-[75px] z-20 bg-header text-white flex items-center justify-center">
      <nav className="w-full px-4 h-full flex items-center justify-between">
        <div>
          <h1 className="text-background text-2xl font-bold">
            Social<span className="text-primary">Sync</span>
          </h1>
        </div>
      </nav>
    </header>
  );
}
