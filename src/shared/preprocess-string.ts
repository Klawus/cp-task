import z from "zod";

export const preprocessString = (input: unknown) => {
  const processed = z
    .string()
    .regex(/^\d+$/)
    .transform(Number)
    .safeParse(input);
  return processed.success ? processed.data : input;
};
