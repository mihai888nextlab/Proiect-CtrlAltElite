import Header from "@/components/header";

export default function Home() {
  return (
    <div>
      <Header />
      <main className="min-h-screen bg-background pt-32">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 max-h-20 w-2/6 bg-gradient-to-r from-primary via-secondary to-header rounded-xl border-header border-4">
            <div className="text-4xl my-2 text-center text-background">Welcome to Social Sync</div>
        </div>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto my-10 md:h-screen lg:py-0 w-10/12 bg-gradient-to-r from-primary via-secondary to-header rounded-xl border-header border-4">


        </div>
        
      </main>
    </div>
  );
}