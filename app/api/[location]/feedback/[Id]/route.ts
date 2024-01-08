import { db } from "@/lib/db";
import { NextResponse } from "next/server";


export async function GET(
    req: Request,
    { params }: { params: {location: string, id: string}}
) {
    try {
        const {location, id} = params
        const record = await db.feedback.findUnique({
            where: {
                location,
                id
            }
        })
        return NextResponse.json(record)
    }catch(error){
        console.log("[GET_FEEDBACK]", error)
        return new NextResponse("Internal Error", {status: 500})
    }
}