import { validateSchema } from "@/libs/utils";
import { signUpSchema } from "@/schemas/auth";
import { ResponseData } from "@/types/form-types";
import { ApiError } from "next/dist/server/api-utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const parsedBody = validateSchema(signUpSchema, body);
    if (!parsedBody.valid) {
      throw new ApiError(422, "Invalid data!");
    }

    return NextResponse.json(
      { message: "Account created successfully!" },
      { status: 200 },
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { message: error?.message || "Internal Server Error" },
      { status: error?.status ? error?.status : error?.statusCode || 500 },
    );
  }
}
