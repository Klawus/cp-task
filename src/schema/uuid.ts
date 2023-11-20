import z from "zod";
import { UUID } from "../app/value-objects/uuid";

export const uuid = () =>
  z
    .string()
    .refine(UUID.isValid, UUID.ERROR_CODE)
    .transform((it) => new UUID(it));
