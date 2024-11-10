import AppHeader from "@/components/appHeader";
import { Community, EventType, User } from "@/type";
import { GetServerSideProps } from "next";
import * as cookieModule from "cookie";
import { useState } from "react";
import Error from "@/components/error";
import Loading from "@/components/loading";
import { useRouter } from "next/router";
import EventComponent from "@/components/event";
import { usePathname } from "next/navigation";

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

  response = await fetch("http://localhost:3000/api/getGeneralEvents", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    return {
      props: { user: userData, events: [] },
    };
  }

  let eventData = await response.json();

  return {
    props: { user: userData, events: eventData },
  };
}) satisfies GetServerSideProps<{ user: User; events: EventType[] }>;

export default function EventPage({
  user,
  events,
}: {
  user: User;
  events: EventType[];
}) {
  const router = useRouter();
  const pathname = usePathname();

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

      <AppHeader name={user.username} />
      <main className="bg-background min-h-screen pt-[75px] font-sans px-36">
        <h2 className="w-[20rem] font-bold text-3xl my-8">Discover events</h2>
        <div className="grid grid-cols-2 gap-4">
          {events.map((event) => (
            <div key={event._id} className="">
              <EventComponent
                event={event}
                attending={user.events?.includes(event._id) ?? false}
                joinEvent={onJoinEvent}
                unjoinEvent={onUnjoinEvent}
              />
            </div>
          ))}
        </div>
      </main>
      <footer></footer>
    </div>
  );
}
