import Header from "@/components/header";

export default function Home() {
  return (
    <div>
      <Header />
      <main className="min-h-screen bg-background pt-32">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 max-h-20 w-2/6 bg-gradient-to-r from-primary via-secondary to-header rounded-xl border-header border-0">
            <div className="text-4xl my-2 text-center text-background">Welcome to Social Sync</div>
        </div>
        <div className="flex flex-col items-center justify-center px-8 py-8 mx-auto my-12 md:h-screen lg:py-0 max-h-96 h-auto w-10/12 bg-gradient-to-r from-primary via-secondary to-header rounded-xl border-header border-0">
          <p className="text-3xl my-4 text-center text-background">Social Sync is more than just a platform—it's a community built on the things that bring us together. Whether you're a painter, photographer, gamer, or outdoor adventurer, Social Sync connects you with people who share your interests. Discover new hobbies, meet like-minded individuals, and grow your skills through interactive experiences and events.Here, every hobbyist has a place to connect, learn, and create lasting relationships. Whether you're looking for advice, inspiration, or a new friend to share your passion with, Social Sync is where your journey begins.</p>
          <p className="text-4xl my-4 mt-2 text-center text-background">Join us today and connect with like-minded individuals who share your passions.</p>
        </div>
        <div className="items-center justify-center flex flex-row">
          <div className="min-h-20 w-2/5 mx-6 bg-gradient-to-r from-primary to-secondary rounded-xl border-header border-0">
            <p className="text-5xl my-3 text-center text-background">Why Join Social Sync?</p>

          </div>
          <div className="w-2/5 min-h-20 my-5 mx-6 bg-gradient-to-r from-secondary to-header rounded-xl border-header border-0">
            <p className="text-5xl my-3 text-center text-background">Ready to Connect?</p>
          </div>
        </div>
      </main>
    </div>
  );
}