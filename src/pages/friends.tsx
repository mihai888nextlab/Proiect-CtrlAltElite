import AppHeader from "@/components/appHeader";
import { TiMessages } from "react-icons/ti";
import { FaUserFriends } from "react-icons/fa";
import { useRouter } from "next/router";
import { Community, User } from "@/type";
import * as cookieModule from "cookie";

export default function Friends(){
  return (
    <div>
      <AppHeader name="C" />
      <main className="min-h-screen bg-background pt-32">
            <img src="pfp_placeholder.png" 
            style={{ 
                width: '100px', height: 'auto',
                borderRadius: '60%',  
                objectFit: 'cover'    }}  >
                </img>
                <div className="h-36">
            <div className="rounded-xl absolute left-[10rem] top-[7rem]">
                <div className="bg-gradient-to-r  from-header via-secondary to-header text-transparent bg-clip-text absolute top-[1rem] font-bold text-2xl w-56">Name:</div>
                <div className="bg-gradient-to-r  from-header via-secondary to-header text-transparent bg-clip-text absolute top-[4rem] font-semibold text-xl w-52">Communities in common: </div>

            </div></div>
      </main>
    </div>
  );
}
