import { NextRequest, NextResponse } from "next/server";

export default async function GET(
    request: NextRequest
): MaybePromise<NextResponse> {
    return new Response('a')
}
