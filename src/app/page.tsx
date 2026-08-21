"use client";
import { useAuth } from "@clerk/nextjs";
import Home from "./home/page";
import { useEffect } from "react";

export default function App() {
  const { getToken } = useAuth();
  useEffect(() => {
    getToken().then((token) => console.log(token));
  }, [getToken]);
  return (
    <>
      <Home />
    </>
  );
}
