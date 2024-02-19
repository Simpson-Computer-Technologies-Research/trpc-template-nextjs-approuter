import { publicProcedure, router } from "./trpc";
import { z } from "zod";

export const appRouter = router({
  testMutate: publicProcedure
    .input(z.object({ text: z.string() }))
    .mutation(async ({ input }) => {
      return { result: input.text };
    }),
});

export type AppRouter = typeof appRouter;
