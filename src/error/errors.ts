import { DrizzleQueryError } from "drizzle-orm";
import { QueryError } from "mysql2";

export function handleError(error: unknown) {
  if (error instanceof DrizzleQueryError) {
    const cause = error.cause;

    if (typeof cause === "object" && cause !== null && "code" in cause) {
      const mysqlErrorCode = (cause as QueryError).code;

      if (mysqlErrorCode === "ER_DUP_ENTRY") {
        return { message: "Email already exists", code: "ER_DUP_ENTRY" };
      }
    }
  }

  return { message: "Error cccured", code: "SEVER_ERROR" };
}
