import { z } from "zod";

export const dataShape = z.array(z.record(z.string().or(z.number())));
export type DataRecord = z.infer<typeof dataShape>[0];
