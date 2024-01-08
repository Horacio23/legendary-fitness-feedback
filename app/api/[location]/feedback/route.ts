import { db } from "@/lib/db";
import { NextResponse } from "next/server";


export async function GET(
    req: Request,
    { params }: { params: {location: string}}
) {
    try {
        const {location} = params
        const record = await db.feedback.findMany({
            where: {
                location
            }
        })
        return NextResponse.json(record)
    }catch(error){
        console.log("[GET_ALL_FEEDBACK]", error)
        return new NextResponse("Internal Error", {status: 500})
    }
}