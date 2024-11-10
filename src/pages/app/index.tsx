import AppHeader from "@/components/appHeader";
import { useState } from "react";
import Error from "@/components/error";
import Loading from "@/components/loading";
import * as cookieModule from "cookie";
import { GetServerSideProps } from "next";
import { Community, EventType, User } from "@/type";
import EventComponent from "@/components/event";
import { usePathname, useRouter } from "next/navigation";

export const getServerSideProps = (async (context) => {
  const cookies = context.req.headers.cookie
    ? cookieModule.parse(context.req.headers.cookie || "")
    : {};

  const token = cookies.token || null;

  let response = await fetch("http://localhost:3000/api/auth/getUserData", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ tokenData: token }),
  });

  if (!response.ok) {
    context.req.headers.cookie = "";
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  let userData = await response.json();

  if (!userData) {
    context.req.headers.cookie = "";
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  response = await fetch("http://localhost:3000/api/getCommunities", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    return {
      props: { user: userData, communities: [], events: [] },
    };
  }

  let communitiesData = await response.json();

  response = await fetch("http://localhost:3000/api/getGeneralEvents", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    return {
      props: { user: userData, communities: communitiesData, events: [] },
    };
  }

  let eventsData = await response.json();

  return {
    props: { user: userData, communities: communitiesData, events: eventsData },
  };
}) satisfies GetServerSideProps<{
  user: User;
  communities: Community[];
  events: EventType[];
}>;

export default function App({
  user,
  communities,
  events,
}: {
  user: User;
  communities: Community[];
  events: EventType[];
}) {
  const router = useRouter();
  const pathname = usePathname;
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onUnjoinEvent = async (eventId: string) => {
    setLoading(true);

    const response = await fetch("/api/unjoinEvent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ eventId, user }),
    });

    if (!response.ok) {
      const data = await response.json();
      setError(data.error);
      setLoading(false);
      return;
    }

    router.push(`${pathname}`);
    setLoading(false);
  };

  const joinCommunity = async (communityId: string) => {
    setLoading(true);

    const response = await fetch("/api/joinCommunity", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ communityId, user }),
    });

    if (!response.ok) {
      const data = await response.json();
      setError(data.error);
      return;
    }

    window.location.reload();
  };

  const onJoinEvent = async (eventId: string) => {
    setLoading(true);

    const response = await fetch("/api/joinEvent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ eventId, user }),
    });

    if (!response.ok) {
      const data = await response.json();
      setError(data.error);
      setLoading(false);
      return;
    }

    router.push(`${pathname}`);
    setLoading(false);
  };

  return (
    <div>
      {error && <Error message={error} onClose={() => setError("")} />}
      {loading && <Loading />}

      <AppHeader name={user.username} points={user.points} />
      <main className="bg-background min-h-screen pt-[75px] font-sans px-36">
        <div className="inline-flex justify-center">
          <h1 className="bg-gradient-to-r from-primary via-secondary to-header text-transparent bg-clip-text text-5xl font-bold text-left mt-16">
            Welcome, {user.username}{" "}
          </h1>
          <p className="text-5xl font-bold mt-16">👋</p>
        </div>

        <div>
          <h2 className="mb-4 text-2xl font-bold">Upcoming events</h2>
          <div>
            <div className="grid grid-cols-2 gap-2">
              {events.map(
                (event, index) =>
                  index < 10 && (
                    <div key={event._id} className="">
                      <EventComponent
                        event={event}
                        joinEvent={() => joinCommunity(event._id)}
                        unjoinEvent={() => onUnjoinEvent(event._id)}
                        attending={false}
                      />
                    </div>
                  )
              )}
            </div>
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-2xl font-bold mt-10">
            Trending communities
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {communities
              .sort((a, b) => (b.members || 0) - (a.members || 0))
              .map(
                (community, index) =>
                  index < 6 && (
                    <div
                      key={community._id}
                      onClick={
                        user.communities.includes(community._id)
                          ? () => router.push(`/app/comunity/${community._id}`)
                          : undefined
                      }
                      className="w-full h-64 rounded-xl flex items-end justify-between p-4 text-white font-bold bg-[size:100%] hover:bg-[size:110%] transition-all cursor-pointer"
                      style={{
                        backgroundImage: `url("../../${community.img}")`,
                        backgroundPosition: "center",
                      }}
                    >
                      <h1 className="m-0 bg-black rounded-xl text-2xl bg-opacity-60 p-3">
                        {community.name}
                      </h1>
                      {!user.communities.includes(community._id) && (
                        <button
                          className="m-0 bg-blue-800 rounded-xl text-2xl px-6 py-3 hover:bg-blue-600"
                          onClick={() => joinCommunity(community._id)}
                        >
                          Join Community
                        </button>
                      )}
                    </div>
                  )
              )}
          </div>
        </div>
      </main>
    </div>
  );
}
