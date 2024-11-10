import AppHeader from "@/components/appHeader";
import { User } from "@/type";
import * as cookieModule from "cookie";
import { GetServerSideProps } from "next";
import { use } from "react";

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

  response = await fetch("http://localhost:3000/api/getUsersByPoints", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    return {
      props: { user: userData, users: [] },
    };
  }

  let usersData = await response.json();

  return {
    props: { user: userData, users: usersData },
  };
}) satisfies GetServerSideProps<{
  user: User;
  users: User[];
}>;

export default function Leaderboard({
  user,
  users,
}: {
  user: User;
  users: User[];
}) {
  return (
    <div>
      <AppHeader name={user.username} points={user.points} />

      <main className="bg-background min-h-screen pt-[75px] font-sans px-36">
        <div className="w-full flex justify-center pt-10">
          <div className="w-2/3 p-4 rounded-xl border-2 bg-white">
            <h2 className="text-center font-bold text-2xl">Leaderboard</h2>
            <div className="flex justify-between items-center mt-4">
              <h3 className="font-bold text-lg">Rank</h3>
              <h3 className="font-bold text-lg">Name</h3>
              <h3 className="font-bold text-lg">Points</h3>
            </div>

            {users.map(
              (userTier, index) =>
                index < 10 && (
                  <div className="flex justify-between items-center mt-4">
                    <p className="text-lg">{index + 1}</p>
                    <p className="text-lg">{userTier.username}</p>
                    <p className="text-lg">{userTier.points}</p>
                  </div>
                )
            )}

            <h2 className="text-lg font-bold mt-10">You are on: </h2>
            <div className="mt-10">
              {users.find((u) => u.username === user.username) && (
                <div className="flex justify-between items-center mt-4">
                  <p className="text-lg">
                    {users.findIndex((u) => u.username === user.username) + 1}
                  </p>
                  <p className="text-lg">{user.username}</p>
                  <p className="text-lg">{user.points}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
