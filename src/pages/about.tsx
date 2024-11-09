import Header from "@/components/header";

export default function About() {
  return (
    <div>
      <Header />
      <main className="min-h-screen bg-background pt-32">
        <div className="bg-gradient-to-r from-primary via-secondary to-header py-4 mx-24 my-20 rounded-xl border-header border-0">
            <h1 className="text-3xl mx-28 my-6 text-background">About Social Sync</h1>
            <p className="text-2xl mx-28 my-6 text-background">Welcome to Social Sync, where passions meet and communities thrive!</p>
            <p className="text-2xl mx-28 my-6 text-background">At Social Sync, we believe that hobbies have the incredible power to bring people together. Whether you're an avid photographer, a gamer, a gardener, or someone who loves crafting, we know that your passion can connect you with others who share your enthusiasm.</p>
            <p className="text-2xl mx-28 my-6 text-background">Our mission is simple: to create a space where individuals can discover, explore, and unite over shared interests. We’ve designed Social Sync to be the ultimate platform for like-minded people to connect, collaborate, and celebrate their favorite pastimes.</p>
            <p className="text-2xl mx-28 my-6 text-background">Through our vibrant community, you can:</p>
            <p className="text-2xl mx-36 my-8 text-background">-Find New Friends: Connect with others who share your interests, from local meetups to global collaborations.</p>
            <p className="text-2xl mx-36 my-8 text-background">-Join or Host Events: Participate in hobby-related events, challenges, and activities, or start your own and invite others to join.</p>
            <p className="text-2xl mx-36 my-8 text-background">-Share and Learn: Share your passion, knowledge, and creativity with others while learning new skills and discovering fresh perspectives.</p>
            <p className="text-2xl mx-36 my-8 text-background">-Be Part of a Movement: Social Sync isn’t just about hobbies—it's about building connections that last. Our platform is about making meaningful bonds and enriching lives through shared experiences.</p>
            <p className="text-2xl mx-28 my-6 text-background">Whether you’re here to find new friends, expand your skills, or simply dive deeper into your favorite hobby, Social Sync is the place for you. Together, we can create a world where everyone is connected, inspired, and empowered by the things they love.</p>
            <p className="text-2xl mx-28 my-6 text-background">Join Social Sync today—where hobbies become more than just pastimes; they become pathways to connection!</p>
        </div>
      </main>
    </div>
  );
}
