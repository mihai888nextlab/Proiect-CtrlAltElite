import { TiMessages } from "react-icons/ti";
import { FaUserFriends } from "react-icons/fa";
import { useRouter } from "next/router";
import { MdEventNote } from "react-icons/md";
import { FaForumbee } from "react-icons/fa";

export default function AppHeader({ name }: { name: string }) {
  const router = useRouter();
  return (
    <header className="fixed top-0 left-0 right-0 h-[75px] z-20 bg-header text-white flex items-center justify-center">
      <nav className="w-full px-8 h-full flex items-center justify-between">
        <div>
          <h1 className="text-background text-2xl font-bold">
            Social<span className="text-primary">Sync</span>
          </h1>
        </div>
        <div className="h-full flex items-center">
          <div className="flex flex-col items-center mx-3 cursor-pointer hover:text-primary">
            <button className="hover:text-primary" onClick={() => router.push("/app")}>
              <FaForumbee className="text-3xl" />        
            </button>

            <button className="font-semibold text-xs hover:text-primary" >Comunities</button>
          </div>

          <div className="flex flex-col items-center mx-3 cursor-pointer hover:text-primary">
            <button className="hover:text-primary" onClick={() => router.push("/events")}>
              <MdEventNote className="text-3xl" />
            </button>

            <button className="font-semibold text-xs hover:text-primary">Events</button>
          </div>

          <div className="flex flex-col items-center mx-3 cursor-pointer hover:text-primary">
          <button className="hover:text-primary" onClick={() => router.push("/app")}>
            <TiMessages className="text-3xl" />        </button>
            <button className="font-semibold text-xs " >Messages</button>
            </div>
          <div className="flex flex-col items-center mx-3 cursor-pointer hover:text-primary">
            <button className="" onClick={() => router.push("/friends")}>
              <FaUserFriends className="text-3xl" />
            </button>

            <button className="font-semibold text-xs">Friends</button>
          </div>
          <button
            className=" ml-3"
            onClick={() => router.push("/test-cristi/account")}
          >
            <div className="h-11 w-11 rounded-full flex items-center justify-center bg-primary text-xl font-bold">
              {name[0].toUpperCase()}
            </div>
          </button>
        </div>
      </nav>
    </header>
  );
}
