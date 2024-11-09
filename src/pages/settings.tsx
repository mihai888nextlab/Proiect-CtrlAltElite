import AppHeader from "@/components/appHeader";
import { useRouter } from "next/router";

export default function IoMdSettings() {
    const router = useRouter();
  return (
    <div>
      <AppHeader name="Cristi" />
      <main className="bg-background">
        <div className="h-[80rem] flex items-center justify-center">
            <div className="h-screen flex items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="bg-primary flex h-[60rem] w-[50rem] rounded-3xl">
                    <h1 className="mx-14 my-14 text-header text-left text-3xl font-bold">Account Settings:</h1>

                </div>
            </div>
        </div>
      </main>
    </div>
  );
}
