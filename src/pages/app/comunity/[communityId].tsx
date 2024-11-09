import Loading from "@/components/loading";
import { useRouter } from "next/router";
import Error from "@/components/error";
import { useState } from "react";
import AppHeader from "@/components/appHeader";
import { Community, User } from "@/type";
import * as cookieModule from "cookie";
import { GetServerSideProps } from "next";

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
      props: { user: userData, communities: [] },
    };
  }

  let communitiesData = await response.json();

  return {
    props: { user: userData, communities: communitiesData },
  };
}) satisfies GetServerSideProps<{ user: User; communities: Community[] }>;

export default function Comunity({
  user,
  communities,
}: {
  user: User;
  communities: Community[];
}) {
  const router = useRouter();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  console.log(
    `url("${
      communities.find((comm) => comm._id == router.query.communityId)?.img ||
      ""
    }")`
  );

  return (
    <div>
      {error && <Error message={error} onClose={() => setError("")} />}
      {loading && <Loading />}

      <AppHeader name={user.username} />
      <main className="bg-background min-h-screen pt-[75px] font-sans px-36">
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
        <h1 className="ml-6 font-bold text-3xl">
          {
            communities.find((comm) => comm._id == router.query.communityId)
              ?.name
          }
        </h1>
      </main>
    </div>
  );
}
