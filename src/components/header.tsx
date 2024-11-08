export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 h-[100px] bg-header z-20 flex items-center justify-center">
      <nav className="w-[1200px] h-full flex items-center justify-between">
        <div>
          <h1 className="text-background text-2xl font-bold">
            Social<span className="text-primary">Sync</span>
          </h1>
        </div>
        <ul>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                flexGrow: "1",
                color: "#FEF3E2",
                fontSize: "35px",
                fontStyle: "italic",
                float: "left",
                textAlign: "center",
              }}
            >
              SOCIAL SYNC
            </div>
          </div>
        </ul>
      </nav>
    </header>
  );
}
