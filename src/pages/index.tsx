import Header from "@/components/header";

export default function Index() {
  return (
    <div>
      <Header />

      <main>
        <div
          className="w-full h-screen flex flex-col items-center justify-center"
          style={{
            backgroundImage: "url('social.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="w-full h-full bg-black bg-opacity-50 flex flex-col items-center justify-center">
            <h1 className="text-5xl font-bold text-secondary">
              Welcome to <span className="font-bold text-white">Social</span>
              <span className="font-bold text-primary">Sync</span>
            </h1>
            <p className="text-secondary mt-4 text-xl font-semibold">
              A place to share your thoughts with the world
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
