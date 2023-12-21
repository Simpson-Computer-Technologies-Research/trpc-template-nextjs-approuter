"use client";

import { useState } from "react";
import { Status, type Response } from "@/lib/types";
import { LoadingRelative } from "@/components/Loading";
import ErrorMessage from "@/components/ErrorMessage";
import MainWrapper from "@/components/MainWrapper";
import Button from "@/components/Button";
import PageHead from "@/components/PageHead";
import { trpc } from "@/trpc/client";
import { PREVENT_TRPC_FETCH } from "@/utils/trpc";

// Homepage component
export default function Home() {
  const [status, setStatus] = useState<Status>(Status.IDLE);
  const [text, setText] = useState<string>("");
  const [data, setData] = useState<Response>();

  // tRPC Query (fetching data)
  const { refetch } = trpc.testQuery.useQuery(
    { text: "Hello" },
    PREVENT_TRPC_FETCH
  );

  // tRPC Mutation (updating data)
  const { mutate } = trpc.testMutate.useMutation();

  // Refetch the query
  async function onFetch() {
    const res = await refetch();

    setStatus(res.error ? Status.ERROR : Status.SUCCESS);
    setData(res.data);
  }

  return (
    <>
      <PageHead
        title="tRPC Next.js Example"
        description="tRPC Next.js Example"
      />

      <MainWrapper>
        <input
          className="border border-black px-4 py-3"
          placeholder="Enter text"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <Button onClick={async () => await onFetch()}>Fetch data</Button>
        <Button onClick={async () => mutate({ text })}>Update data</Button>

        {status === Status.LOADING && <LoadingRelative />}
        {status === Status.SUCCESS && <ResponseData data={data!} />}
        {status === Status.ERROR && <ErrorMessage>Error!</ErrorMessage>}
      </MainWrapper>
    </>
  );
}

function ResponseData({ data }: { data: Response }) {
  return (
    <p className="mt-3">
      <strong>Response data:</strong> {data.result}
    </p>
  );
}
