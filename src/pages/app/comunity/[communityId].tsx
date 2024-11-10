import Loading from "@/components/loading";
import { useRouter } from "next/router";
import Error from "@/components/error";
import { FormEvent, useState } from "react";
import AppHeader from "@/components/appHeader";
import { Community, EventType, User } from "@/type";
import * as cookieModule from "cookie";
import { GetServerSideProps } from "next";
import { Post } from "@/type";
import UserPfp from "@/components/userPfp";
import EventComponent from "@/components/event";
import { AiOutlinePlusCircle } from "react-icons/ai";
import AddEventModal from "@/components/modals/addEventModal";
import { usePathname } from "next/navigation";
import { set } from "mongoose";
import Footer from "@/components/footer";

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
      props: {
        user: userData,
        communities: [],
        posts: [],
        usersCommunityData: [],
        events: [],
      },
    };
  }

  let communitiesData = await response.json();

  response = await fetch("http://localhost:3000/api/getMessagesByCommunity", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      communityId: context.query.communityId,
    }),
  });

  if (!response.ok) {
    return {
      props: {
        user: userData,
        communities: communitiesData,
        posts: [],
        usersCommunityData: [],
        events: [],
      },
    };
  }

  let postsData: Post[] = await response.json();

  response = await fetch("http://localhost:3000/api/getUsersByCommunity", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      communityId: context.query.communityId,
    }),
  });

  if (!response.ok) {
    return {
      props: {
        user: userData,
        communities: communitiesData,
        posts: [],
        usersCommunityData: [],
        events: [],
      },
    };
  }

  let usersCommunityData = await response.json();

  response = await fetch("http://localhost:3000/api/getEvents", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      communityId: context.query.communityId,
    }),
  });

  if (!response.ok) {
    return {
      props: {
        user: userData,
        communities: communitiesData,
        posts: postsData,
        usersCommunityData,
        events: [],
      },
    };
  }

  let eventData = await response.json();

  return {
    props: {
      user: userData,
      communities: communitiesData,
      posts: postsData,
      usersCommunityData,
      events: eventData,
    },
  };
}) satisfies GetServerSideProps<{
  user: User;
  communities: Community[];
  posts: Post[];
  usersCommunityData: User[];
  events: EventType[];
}>;

export default function Comunity({
  user,
  communities,
  posts,
  usersCommunityData,
  events,
}: {
  user: User;
  communities: Community[];
  posts: Post[];
  usersCommunityData: User[];
  events: EventType[];
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [inpVal, setInpVal] = useState("");
  const [selected, setSelected] = useState(
    typeof router.query.selected === "string" &&
      ["about", "discussion", "events", "people"].includes(
        router.query.selected
      )
      ? router.query.selected
      : "about"
  );

  const [modalOpen, setModalOpen] = useState("");

  const onMessageSend = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const message = formData.get("message") as string;

    if (!message) {
      return;
    }

    setLoading(true);

    const response = await fetch("http://localhost:3000/api/sendPost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        user,
        communityId: router.query.communityId,
      }),
    });

    if (!response.ok) {
      const data = await response.json();
      setError(data.error);
      return;
    }

    setInpVal("");
    router.push(`${pathname}?selected=${selected}`);
    setLoading(false);
  };

  const onAddEventSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let formData = new FormData(e.currentTarget);
    let name = formData.get("name") as string;
    let description = formData.get("description") as string;
    let date = formData.get("date") as string;
    let location = formData.get("location") as string;

    setLoading(true);

    const response = await fetch("/api/addEvent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        description,
        date,
        location,
        group: router.query.communityId,
        organiser: user._id,
      }),
    });

    if (!response.ok) {
      const data = await response.json();
      setError(data.error);
      setLoading(false);
      return;
    }

    router.push(`${pathname}?selected=${selected}`);
    setLoading(false);
  };

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

    router.push(`${pathname}?selected=${selected}`);
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

    router.push(`${pathname}?selected=${selected}`);
    setLoading(false);
  };

  return (
    <div>
      {error && <Error message={error} onClose={() => setError("")} />}
      {loading && <Loading />}

      {modalOpen == "addEvent" && (
        <AddEventModal
          onCLose={() => setModalOpen("")}
          onSubmit={onAddEventSubmit}
        />
      )}

      <AppHeader name={user.username} points={user.points} />
      <main className="bg-background min-h-screen pt-[75px] font-sans px-36 pb-10">
        <div
          className="w-full h-[400px] bg-cover bg-center rounded-b-xl"
          style={{
            backgroundImage: `url("../../${
              communities.find((comm) => comm._id == router.query.communityId)
                ?.img || ""
            }")`,
            backgroundPosition: "center",
          }}
        ></div>
        <h1 className="ml-6 mb-1 font-bold text-3xl">
          {
            communities.find((comm) => comm._id == router.query.communityId)
              ?.name
          }
        </h1>
        <p className="ml-6 font-semibold text-lg text-gray-500">
          {
            communities.find((comm) => comm._id == router.query.communityId)
              ?.members
          }{" "}
          members
        </p>

        <div className="border-t-[1px] mt-6 border-gray-500 mb-10">
          <ul className="flex ml-6 mt-1">
            <li
              className={
                "p-4 hover:bg-hover rounded-lg font-semibold text-gray-500 cursor-pointer border-blue-500" +
                (selected == "about" && " border-b-2")
              }
              onClick={() => setSelected("about")}
            >
              About
            </li>
            <li
              className={
                "p-4 hover:bg-hover rounded-lg font-semibold text-gray-500 cursor-pointer border-blue-500" +
                (selected == "discussion" && " border-b-2")
              }
              onClick={() => setSelected("discussion")}
            >
              Discussion
            </li>
            <li
              className={
                "p-4 hover:bg-hover rounded-lg font-semibold text-gray-500 cursor-pointer border-blue-500" +
                (selected == "events" && " border-b-2")
              }
              onClick={() => setSelected("events")}
            >
              Events
            </li>
            <li
              className={
                "p-4 hover:bg-hover rounded-lg font-semibold text-gray-500 cursor-pointer border-blue-500" +
                (selected == "people" && " border-b-2")
              }
              onClick={() => setSelected("people")}
            >
              People
            </li>
          </ul>
        </div>

        {selected == "about" && (
          <div className="w-full flex justify-center">
            <div className="w-2/3 p-4 rounded-xl border-2 bg-white">
              <h2 className="text-2xl font-bold mb-6">About this group</h2>
              <p>
                {
                  communities.find(
                    (comm) => comm._id == router.query.communityId
                  )?.description
                }
              </p>
            </div>
          </div>
        )}

        {selected == "discussion" && (
          <div className="w-full flex justify-center">
            <div className="w-2/3 p-4 rounded-xl border-2 bg-white">
              <div className="grid gap-4 grid-cols-[44px_1fr]">
                <div className="h-11 w-11 rounded-full flex items-center justify-center bg-primary text-white text-xl font-bold cursor-pointer">
                  {user.username[0].toUpperCase()}
                </div>
                <form onSubmit={onMessageSend} className="w-auto h-full">
                  <input
                    type="text"
                    name="message"
                    id="message"
                    value={inpVal}
                    onChange={(e) => setInpVal(e.target.value)}
                    className="w-full bg-gray-200 h-[40px] rounded-3xl p-4"
                    placeholder="Write a post ..."
                  />
                </form>
              </div>

              <div className="mt-10 flex flex-col items-center justify-center">
                {!posts.length && <p>No posts yet</p>}
                {posts.map((post) => (
                  <div className="w-full border-2 rounded-xl p-4 mb-4">
                    <div className="flex justify-between">
                      <div className="grid grid-cols-[44px_1fr] gap-4 items-center mb-5">
                        <UserPfp name={post.username} />
                        <div>
                          <h1 className="font-bold text-lg m-0">
                            {post.username}
                          </h1>
                          <p className="text-gray-500 text-sm">
                            {new Date(post.dateCreated).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                    <p>{post.message}</p>
                  </div>
                ))}
              </div>
            </div>
            
          </div>
        )}

        {selected == "events" && (
          <div className="w-full flex justify-center">
            <div className="w-2/3 p-4 rounded-xl border-2 bg-white">
              <h2 className="text-2xl font-bold mb-6 inline-flex items-center">
                Events in this group{" "}
                <AiOutlinePlusCircle
                  className="ml-2 cursor-pointer hover:text-primary"
                  onClick={() => setModalOpen("addEvent")}
                />
              </h2>
              {!events.length && <p>No events yet</p>}

              <div className="grid grid-cols-3 gap-2">
                {events.map((event) => (
                  <EventComponent
                    event={event}
                    attending={user.events?.includes(event._id) ?? false}
                    joinEvent={onJoinEvent}
                    unjoinEvent={onUnjoinEvent}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {selected == "people" && (
          <div className="w-full flex justify-center">
            <div className="w-2/3 p-4 rounded-xl border-2 bg-white">
              <h2 className="text-2xl font-bold mb-6">People in this group</h2>
              <div className="grid grid-cols-4 gap-4">
                {usersCommunityData.map((user) => (
                  <div className="flex flex-col items-center">
                    <UserPfp name={user.username} />
                    <p className="font-semibold">{user.username}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
