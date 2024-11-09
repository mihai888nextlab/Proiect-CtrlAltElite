import AppHeader from "@/components/appHeader";
import { IoMdSettings } from "react-icons/io";
import { useRouter } from "next/router";
import { Community, User } from "@/type";

export default function Account(){
    const router = useRouter();
  return (
    <div>
      <AppHeader name="cristi" />
      <main className="bg-background">
        <div className="h-96">
            <div className="bg-primary rounded-full absolute left-[3rem] top-[6.75rem] h-60 w-60"></div>
            <div className="rounded-xl absolute left-[20rem] top-[9rem]">
                <div className="bg-gradient-to-r  from-header via-secondary to-header text-transparent bg-clip-text absolute top-[1rem] font-bold text-5xl w-56">Cristi</div>
                <div className="bg-gradient-to-r  from-header via-secondary to-header text-transparent bg-clip-text absolute top-[4rem] font-semibold text-3xl w-52">0 Communities</div>
                <div className="bg-gradient-to-r  from-header via-secondary to-header text-transparent bg-clip-text absolute top-[6rem] font-semibold text-3xl w-40">0 Friends</div>
            </div>
            <button className="absolute right-[5rem] top-[12rem] h-[3rem] w-[3rem] hover:animate-spin" onClick={() => router.push("/settings")}>
                <IoMdSettings className="h-[3rem] w-[3rem]"/>
            </button>
        </div>

        <div className="bg-gradient-to-r  from-header via-primary to-header text-transparent absolute top-[24rem] w-full h-2"></div>

        <div className="bg-primary h-[40rem]">

        </div>
      </main>
    </div>
  );
}
