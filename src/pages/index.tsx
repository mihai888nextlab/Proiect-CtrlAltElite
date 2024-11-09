import Header from "@/components/header";

export default function Home() {
  return (
    <div>
      <Header />

      <main className="min-h-screen bg-background pt-32">
                <div style={{ backgroundColor: 'orange', width: 'fit-content', padding: '0px' }} 
                className="flex flex-row items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 max-h-20 w-2/6 bg-gradient-to-r from-primary via-secondary to-header rounded-xl border-header border-0" >
                  <img src="logo.png"         style={{
          width: '500px',
          height: 'auto',
          mixBlendMode: 'multiply', 
          height: '400px', 
          border: '2px ',
          padding: '10px', 
          borderRadius: '15px',
          overflow: 'hidden',
          backgroundColor: 'bg-gradient-to-r from-secondary to-header rounded-xl border-header border-0'
        }}className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 "></img>
                </div>
      </main>
      <footer></footer>
    </div>
  );
}