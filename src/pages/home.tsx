import Header from "@/components/header";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  return (
    <div>
      <Header />
      <main className="min-h-screen bg-background pt-32">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 max-h-20 w-2/6 bg-gradient-to-r from-primary via-secondary to-header rounded-xl border-header border-0">
            <div className="font-semibold text-4xl my-2 text-center text-background bg-clip-text bg-gradient-to-r from-primary via-secondary to-header">Welcome to Social Sync</div>
        </div>
        <div className="flex flex-col items-center justify-center px-8 py-8 mx-auto my-12 md:h-screen lg:py-0 h-[12rem] w-10/12 bg-gradient-to-r from-primary via-secondary to-header rounded-xl border-header border-0">
          <p className="font-semibold text-3xl my-4 text-center text-background">Social Sync is more than just a platform—it's a community built on the things that bring us together. Whether you're a painter, photographer, gamer, or outdoor adventurer, Social Sync connects you with people who share your interests. Discover new hobbies, meet like-minded individuals, and grow your skills through interactive experiences and events.Here, every hobbyist has a place to connect, learn, and create lasting relationships. Whether you're looking for advice, inspiration, or a new friend to share your passion with, Social Sync is where your journey begins.</p>
          <p className="font-semibold text-4xl my-4 mt-2 text-center text-background">Join us today and connect with like-minded individuals who share your passions.</p>
        </div>
        <div className="items-center justify-center flex flex-row">
          <div className="min-h-20 w-2/5 mx-6  bg-gradient-to-r from-primary to-secondary rounded-xl border-header border-0">
            <p className="font-semibold text-5xl my-5 text-center text-background">Why Join Social Sync?</p>

          </div>
          <div className="w-2/5 min-h-20 mt-20 my=10 mx-6 bg-gradient-to-r from-secondary to-header rounded-xl border-header border-0">
            <p className="font-semibold text-5xl my-5 text-center text-background">Ready to Connect?</p>
          </div>
        </div>
        <div className="items-center justify-center flex flex-row">
          <div className="min-h-20 w-2/5 mx-6 bg-gradient-to-r h-[30rem] from-primary to-secondary rounded-xl border-header border-0">
            <p className="font-semibold text-3xl my-4 mx-4 text-center text-background">By joining Social Sync, you’ll gain access to:</p>
            <p className="font-semibold text-2xl my-3 mx-4 text-center text-background">-A Welcoming Community: Meet new people who are as passionate about your interests as you are.</p>
            <p className="font-semibold text-2xl my-3 mx-4 text-center text-background">-Exclusive Events: Participate in workshops, competitions, and hobby-related meetups that help you grow.</p>
            <p className="font-semibold text-2xl my-3 mx-4 text-center text-background">-Learn New Skills: Share knowledge and learn from others in a collaborative environment.</p>
            <p className="font-semibold text-2xl my-3 mx-4 text-center text-background">-Grow Your Network: Expand your social circle, collaborate with like-minded individuals, and create lasting friendships.</p>
          </div>
          <div className="w-2/5 min-h-20 my-5 mx-6 bg-gradient-to-r h-[30rem] from-secondary to-header rounded-xl border-header border-0">
            <p className="font-semibold text-3xl my-28 mx-10 text-center text-background">Whether you’re looking to discover a new hobby, enhance your current skills, or make new friends, Social Sync is the place for you. Sign up today to join a growing community of passionate individuals from around the world.</p>
          </div>
          
        </div>
        
        <div className="items-center justify-center flex flex-row">
          <button className="font-semibold w-1/5 min-h-20 my-24 mx-6 bg-gradient-to-r from-header via-secondary to-header rounded-xl text-3xl hover:from-secondary hover:via-header hover:to-secondary border-secondary border-2 font-semibold text-background px-8 py-4 rounded-xl hover:bg-secondary" onClick={() => router.push("/signup")}>
            Sign Up
          </button>
          <button className="font-semibold w-1/5 min-h-20 my-24 mx-6 bg-gradient-to-r from-header via-secondary to-header rounded-xl text-3xl hover:from-secondary hover:via-header hover:to-secondary border-secondary border-2 font-semibold text-background px-8 py-4 rounded-xl hover:bg-secondary" onClick={() => router.push("/login")}>
            Log In
          </button>
        </div>
      </main>
    </div>
  );
}