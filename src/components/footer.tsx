import { useRouter } from "next/router";

export default function Footer() {
  const router = useRouter();

  return (
    <footer className="h-[300px] bg-gradient-to-r from-primary via-secondary to-primary z-20 flex flex-col">
          <div>
            <p className="text-4xl font-bold text-background mt-10 mx-10">SocialSync®️</p>
          </div>

          <div className="flex items-center justify-center mt-2">
            <button className="text-2xl font-semibold rounded-xl mx-20 text-background hover:underline w-[10rem]" onClick={() => router.push("/contact")}>Contact</button>
            <button className="text-2xl font-semibold rounded-xl mx-20 text-background hover:underline w-[10rem]" onClick={() => router.push("/home")}>Home</button>
            <button className="text-2xl font-semibold rounded-xl mx-20 text-background hover:underline w-[10rem]" onClick={() => router.push("/about")}>About</button>
          </div>

          <div className="flex items-center justify-center my-24">
            <p className="text-xl font-semibold text-background">© 2024 SocialSync. All rights reserved</p>
          </div>
    </footer>
  );
}
