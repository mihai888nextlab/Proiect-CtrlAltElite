import AppHeader from "@/components/appHeader";
import Loading from "@/components/loading";
import { use, useState } from "react";
import Error from "@/components/error";
import { MdTimer } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import * as cookieModule from "cookie";
import { GetServerSideProps } from "next";
import { EventType, User } from "@/type";
import UserPfp from "@/components/userPfp";
import { useRouter } from "next/router";
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

  response = await fetch("http://localhost:3000/api/getEventById", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ eventId: context.params?.eventId }),
  });

  if (!response.ok) {
    return {
      props: { user: userData, event: [] },
    };
  }

  let eventsData = await response.json();

  response = await fetch("http://localhost:3000/api/getUserById", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId: eventsData.organiser }),
  });

  if (!response.ok) {
    return {
      props: { user: userData, event: [] },
    };
  }

  eventsData.organiserUsername = (await response.json()).username;

  response = await fetch("http://localhost:3000/api/getUsersByEvent", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ eventId: context.params?.eventId }),
  });

  if (!response.ok) {
    return {
      props: { user: userData, event: [] },
    };
  }

  eventsData.attendees = await response.json();

  return {
    props: { user: userData, event: eventsData },
  };
}) satisfies GetServerSideProps<{ user: User; event: EventType }>;

export default function Event({
  user,
  event,
}: {
  user: User;
  event: EventType;
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

      <main className="bg-background min-h-screen pt-[75px] font-sans px-36 pb-10">
        <div className="w-full flex justify-center mt-10">
          <div className="w-2/3 p-4 rounded-xl border-2 bg-white">
            <h1 className="text-3xl font-bold mb-10">{event.name || ""}</h1>

            <h2 className="text-2xl font-bold">Details</h2>
            <p className="mb-10 text-xl">
              {event?.description || "No description available"}
            </p>

            <p className="inline-flex items-center text-xl font-bold text-gray-500">
              <MdTimer className="mr-1" />{" "}
              {new Date(event?.date).toLocaleString() || "No date available"}
            </p>
            <br />

            <p className="inline-flex items-center text-xl font-bold text-gray-500">
              <FaLocationDot className="mr-1" />{" "}
              {event?.location || "No location available"}
            </p>

            <h2 className="text-2xl font-bold mt-10">Organiser</h2>
            <div className="inline-flex justify-center items-center mt-4">
              <UserPfp name={event?.organiserUsername || ""} />
              <p className="text-xl ml-2 font-semibold">
                {event?.organiserUsername}
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-10">Attendees</h2>
            <div className="flex flex-wrap mt-4 mb-10">
              {event?.attendees?.map((attendee) => (
                <div
                  className="inline-flex justify-center items-center mr-4"
                  key={attendee._id}
                >
                  <UserPfp name={event?.organiserUsername || ""} />
                  <p className="text-xl ml-2 font-semibold">
                    {attendee.username}
                  </p>
                </div>
              ))}
            </div>

            {user.events?.includes(event._id) ?? false ? (
              <button
                className="border-2 border-primary bg-primary text-white rounded-lg p-3 font-bold mt-2 w-full"
                onClick={() => onUnjoinEvent(event._id)}
              >
                Attending
              </button>
            ) : (
              <button
                className="border-2 border-primary text-primary rounded-lg p-3 font-bold mt-2 w-full"
                onClick={() => onJoinEvent(event._id)}
              >
                Attend
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
