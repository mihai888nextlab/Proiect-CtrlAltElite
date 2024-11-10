import AppHeader from "@/components/appHeader";
import { IoMdSettings } from "react-icons/io";
import { useRouter } from "next/router";
import { Community, User } from "@/type";
import { GetServerSideProps } from "next";
import * as cookieModule from "cookie";
import { useState } from "react";
import Error from "@/components/error";
import Loading from "@/components/loading";
import { CiCirclePlus } from "react-icons/ci";
import { CiSquarePlus } from "react-icons/ci";

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


export default function Friends({
  user,
  communities,
}: {
  user: User;
  communities: Community[];
}){
  return (
    <div>
      <AppHeader name={user.username} />
      <main className="min-h-screen bg-background pt-32">
            <img src="pfp_placeholder.png" 
            style={{ 
                width: '100px', height: 'auto',
                borderRadius: '60%',  
                objectFit: 'cover'    }}  >
                </img>
                <div className="h-36">
            <div className="rounded-xl absolute left-[10rem] top-[7rem]">
                <div className="bg-gradient-to-r  from-header via-secondary to-header text-transparent bg-clip-text absolute top-[1rem] font-bold text-2xl w-56">Name:</div>
                <div className="bg-gradient-to-r  from-header via-secondary to-header text-transparent bg-clip-text absolute top-[4rem] font-semibold text-xl w-52">Communities in common: </div>

            </div></div>
      </main>
    </div>
  );
}
