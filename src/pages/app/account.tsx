import AppHeader from "@/components/appHeader";
import { User } from "@/type";
import { GetServerSideProps } from "next";
import * as cookieModule from "cookie";

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

  return {
    props: { user: userData },
  };
}) satisfies GetServerSideProps<{
  user: User;
}>;

export default function Account({ user }: { user: User }) {
  return (
    <div>
      <AppHeader name={user.username} points={user.points} />

      <main className="bg-background min-h-screen pt-[75px] font-sans px-36">
        <h2 className="font-bold text-3xl my-8">Account information</h2>
        <div className="w-full grid grid-cols-[1fr_2fr] gap-2">
          <div className="rounded-xl border-2 bg-white p-4">
            <h3 className="text-xl font-bold px-4 py-2">
              Personal information
            </h3>
            <div className="flex flex-col px-4 py-2">
              <p className="text-lg font-semibold">Username: {user.username}</p>
              <p className="text-lg font-semibold">
                Full name: {user.fullName}
              </p>
              <p className="text-lg font-semibold">Email: {user.email}</p>
            </div>
          </div>
          <div className="rounded-xl border-2 bg-white p-4">
            <h3 className="text-xl font-bold px-4 py-2">Points</h3>
            <div className="flex flex-col px-4 py-2">
              <p className="text-lg font-semibold">Points: {user.points}</p>
            </div>

            <h3 className="text-xl font-bold px-4 py-2">History</h3>
            {user.pointsHistory?.map((event) => (
              <div className="flex flex-col px-4 py-2">
                <p className="text-lg font-semibold">
                  <span className="text-green-500">{event.points}</span> at{" "}
                  {new Date(event.date).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
