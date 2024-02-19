"use client";

import { useState } from "react";
import ErrorMessage from "@/components/ErrorMessage";
import MainWrapper from "@/components/MainWrapper";
import { trpc } from "@/lib/trpc/client";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import Button from "@/components/buttons/Button";

/**
 * Status enum
 */
enum Status {
  IDLE,
  LOADING,
  SUCCESS,
  ERROR,
}

/**
 * Home Page
 *
 * @returns JSX.Element
 */
export default function Home(): JSX.Element {
  const [status, setStatus] = useState<Status>(Status.IDLE);
  const [text, setText] = useState<string>("");
  const [data, setData] = useState<{ result: string }>();

  // tRPC mutations
  const { mutateAsync: fetchData } = trpc.testMutate.useMutation();

  /**
   * Fetch data
   *
   * @returns Promise<void>
   */
  async function onClick(): Promise<void> {
    setStatus(Status.LOADING);

    const res = await fetchData({
      text,
    });

    setStatus(Status.SUCCESS);
    setData(res);
  }

  return (
    <MainWrapper className="gap-4">
      <div className="text-center flex flex-col gap-1">
        <h1 className="text-3xl font-bold">tRPC Template</h1>
        <p className="text-lg">
          This is a template for building fullstack TypeScript applications with
          tRPC.
        </p>
      </div>

      <input
        className="border-2 rounded-lg p-3 w-full"
        placeholder="Enter text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <Button className="w-full" onClick={onClick}>
        Fetch Data
      </Button>

      {status === Status.LOADING && <LoadingSpinner className="h-7 w-7" />}
      {status === Status.SUCCESS && <p>{data?.result}</p>}
      {status === Status.ERROR && <ErrorMessage>Error!</ErrorMessage>}
    </MainWrapper>
  );
}
