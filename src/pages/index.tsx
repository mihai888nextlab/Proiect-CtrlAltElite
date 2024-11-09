import Header from "@/components/header";

export default function Home() {
  return (
    <div>
      <Header />

      <main className="min-h-screen bg-background pt-28">
                <div style={{ backgroundColor: 'orange', width: 'fit-content', padding: '10px' }} className="bg-gradient-to-r from-primary via-secondary to-header py-4 mx-24 my-20 rounded-xl border-header border-0">
                  <img src="logo.png"         style={{
          width: '500px',
          height: 'auto',
          mixBlendMode: 'multiply',
        }}className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" ></img>
                </div>
      </main>
      <footer></footer>
    </div>
  );
}
