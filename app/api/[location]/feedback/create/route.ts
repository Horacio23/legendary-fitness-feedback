import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
    { params }: { params: {location: string}}
) {
    try {
        const { location } = params
        const {
            name,
            phone,
            email,
            firstTime,
            workoutRating,
            cleanlinessRating,
            recommendationRating,
            returnRating,
            coach,
            coachRating,
            feedback,
        } = await req.json()

        const record = await db.feedback.create({
            data: {
                name,
                phone,
                email,
                firstTime,
                workoutRating,
                cleanlinessRating,
                recommendationRating,
                returnRating,
                coachName : coach,
                coachRating,
                suggestions: feedback,
                location
            }
        })

        return NextResponse.json(record)
    } catch (error) {
        console.log("[FEEDBACK]", error)
        return new NextResponse("Internal Error", {status: 500})
    }
}
