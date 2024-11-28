import AppHeader from "@/components/appHeader";
import { useState } from "react";
import Error from "@/components/error";
import Loading from "@/components/loading";

export default function App() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div>
      {error && <Error message={error} onClose={() => setError("")} />}
      {loading && <Loading />}

      <AppHeader name={"fjfj"} />
      <main className="bg-background min-h-screen pt-[75px] font-sans px-36">
        <div className="inline-flex justify-center">
          <h1 className="bg-gradient-to-r from-primary via-secondary to-header text-transparent bg-clip-text text-5xl font-bold text-left mt-16">
            Welcome, {"ffkk"}{" "}
          </h1>
          <p className="text-5xl font-bold mt-16">👋</p>
        </div>
      </main>
    </div>
  );
}