import type { ZodType } from "zod";
import type { Request } from "express";
import { ValidationException } from "../../exceptions/validation-exception";

export const validateRequestWithSchema = <T>(
  schema: ZodType<T>,
  req: Request,
): T => {
  const result = schema.safeParse({
    query: req.query ?? {},
    body: req.body ?? {},
    params: req.params ?? {},
  });

  if (!result.success) {
    const errors = result.error.issues.map((e) => ({
      code: e.code,
      property: e.path.join(".") || "unknown",
      message: e.message,
    }));
    throw new ValidationException(errors);
  }

  return result.data;
};
