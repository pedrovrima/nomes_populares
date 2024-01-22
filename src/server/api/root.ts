import { popularRouter } from "@/server/api/routers/popular";
import { createTRPCRouter } from "@/server/api/trpc";
import { speciesRouter } from "./routers/species";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  popular: popularRouter,
  species: speciesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
