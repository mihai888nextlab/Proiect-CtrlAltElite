import Loading from "@/components/loading";
import { useRouter } from "next/router";
import Error from "@/components/error";
import { FormEvent, useState } from "react";
import AppHeader from "@/components/appHeader";
import { Community, User } from "@/type";
import * as cookieModule from "cookie";
import { GetServerSideProps } from "next";
import { Post } from "@/type";

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
      props: { user: userData, communities: [], posts: [] },
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
      props: { user: userData, communities: communitiesData, posts: [] },
    };
  }

  let postsData = await response.json();

  return {
    props: { user: userData, communities: communitiesData, posts: postsData },
  };
}) satisfies GetServerSideProps<{
  user: User;
  communities: Community[];
  posts: Post[];
}>;

export default function Comunity({
  user,
  communities,
  posts,
}: {
  user: User;
  communities: Community[];
  posts: Post[];
}) {
  const router = useRouter();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState("about");

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

    window.location.reload();
  };

  return (
    <div>
      {error && <Error message={error} onClose={() => setError("")} />}
      {loading && <Loading />}

      <AppHeader name={user.username} />
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
            <div className="w-1/2 p-4 rounded-xl border-2 bg-white">
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
            <div className="w-1/2 p-4 rounded-xl border-2 bg-white">
              <div className="grid gap-4 grid-cols-[44px_1fr]">
                <div className="h-11 w-11 rounded-full flex items-center justify-center bg-primary text-white text-xl font-bold cursor-pointer">
                  {user.username[0].toUpperCase()}
                </div>
                <form onSubmit={onMessageSend} className="w-auto h-full">
                  <input
                    type="text"
                    name="message"
                    id="message"
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
                      <h1 className="font-bold">{post.userId}</h1>
                      <p className="text-gray-500">
                        {post.dateCreated.toString()}
                      </p>
                    </div>
                    <p>{post.message}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
