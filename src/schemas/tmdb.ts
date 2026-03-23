import { z } from "zod";

export const TMDBIdSchema = z.string().regex(/^\d+$/, {
    message: "Invalid TMDB ID"
});

export const TMDBError = (error: z.ZodError) => z.treeifyError(error);