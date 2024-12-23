import { TiMessages } from "react-icons/ti";
import { FaUserFriends } from "react-icons/fa";
import { useRouter } from "next/router";
import { MdEventNote } from "react-icons/md";
import { FaForumbee } from "react-icons/fa";
import { MdLeaderboard } from "react-icons/md";

export default function AppHeader({
  name,
  points,
}: {
  name: string;
  points: number | undefined;
}) {
  const router = useRouter();
  return (
    <header className="fixed top-0 left-0 right-0 h-[75px] z-20 bg-header text-white flex items-center justify-center">
      <nav className="w-full px-8 h-full flex items-center justify-between">
        <div>
          <h1
            className="text-background text-2xl font-bold cursor-pointer"
            onClick={() => router.push("/app")}
          >
            Social<span className="text-primary">Sync</span>
          </h1>
        </div>
        <div className="h-full flex items-center">
          <div className="flex flex-col items-center mx-3 cursor-pointer">
            <button
              className="flex flex-col justify-center items-center"
              onClick={() => router.push("/app/comunity")}
            >
              <FaForumbee className="text-3xl" />
            </button>

            <button className="font-semibold text-xs ">Comunities</button>
          </div>

          <div className="flex flex-col items-center justify-center mx-3 cursor-pointer">
            <button
              className="flex flex-col justify-center items-center"
              onClick={() => router.push("/app/event")}
            >
              <MdEventNote className="text-3xl" />
              <span className="text-xs font-semibold">Events</span>
            </button>
          </div>

          <div className="flex flex-col items-center justify-center mx-3 cursor-pointer">
            <button
              className="flex flex-col justify-center items-center"
              onClick={() => router.push("/app/leaderboard")}
            >
              <MdLeaderboard className="text-3xl" />
              <span className="text-xs font-semibold">Leaderboard</span>
            </button>
          </div>

          <button
            className=" ml-3 flex items-center"
            onClick={() => router.push("/app/account")}
          >
            <p className="text-primary font-bold mr-2 text-xl">
              {points || 0} Points
            </p>
            <div className="h-11 w-11 rounded-full flex items-center justify-center bg-primary hover:bg-secondary text-xl font-bold">
              {name[0].toUpperCase()}
            </div>
          </button>
        </div>
      </nav>
    </header>
  );
}
