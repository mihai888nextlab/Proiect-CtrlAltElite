import Header from "@/components/header";

export default function Home() {
  return (
    <div>
      <Header />
      <main className="min-h-screen bg-background pt-32">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 max-h-20 w-2/6 bg-gradient-to-r from-primary via-secondary to-header rounded-xl border-header border-4">
            <div className="text-4xl my-2 text-center text-background">Welcome to Social Sync</div>
        </div>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto my-8 md:h-screen lg:py-0 max-h-96 w-10/12 bg-gradient-to-r from-primary via-secondary to-header rounded-xl border-header border-4">
          <p className="text-3xl my-2 text-center text-background">At Social Sync, we believe that hobbies aren't just pastimes – they’re powerful ways to connect, learn, and grow. Whether you're a photographer, gamer, or fitness enthusiast, our platform brings people together based on shared interests, fostering new friendships, collaborations, and experiences.</p>
          <p className="text-4xl my-2 text-center text-background">Join us today and connect with like-minded individuals who share your passions.</p>
        </div>
        <div className="items-center justify-center flex flex-row">
          <div className="min-h-20 w-2/5 mx-6 bg-gradient-to-r from-primary to-secondary rounded-xl border-header border-4">
            <p className="text-5xl my-2 text-center text-background">How Social Sync Works</p>

          </div>
          <div className="w-2/5 min-h-20 my-5 mx-6 bg-gradient-to-r from-secondary to-header rounded-xl border-header border-4">
            <p className="text-5xl my-2 text-center text-background">Our Mission</p>
          </div>
        </div>
      </main>
    </div>
  );
}