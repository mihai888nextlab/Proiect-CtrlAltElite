import AppHeader from "@/components/appHeader";
import { useRouter } from "next/router";

export default function Friends(){
  const router = useRouter();
  return (
    <div>
      <AppHeader name="Cristi"/>
      <main className="min-h-screen bg-background pt-32">

      </main>
    </div>
  );
}