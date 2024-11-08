import Header from "@/components/header";

export default function Home() {
  return (
    <div>
      <Header />
      <main className="min-h-screen bg-background pt-32">
        <div className="py-4 mx-24 my-12 bg-gradient-to-r from-primary via-secondary to-header rounded-xl">
            <h1 className="text-4xl mx-28 my-6 text-background">Welcome Social Sync</h1>
        </div>
        
      </main>
    </div>
  );
}