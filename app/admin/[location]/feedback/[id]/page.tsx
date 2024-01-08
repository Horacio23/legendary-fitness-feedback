import { db } from "@/lib/db"

const getData = async (id:string, location: string) => {
    const feedback = await db.feedback.findUnique({
        where:{
            id: id,
            location: location
        }
    })
     return feedback
}

const ViewFeedbackPage = async ({
    params
}:{    
    params: {id: string, location: string} 
}) => {
    const {
        name, 
        phone, 
        email, 
        coachName, 
        coachRating, 
        suggestions, 
        firstTime, 
        workoutRating,
        cleanlinessRating,
        recommendationRating,
        returnRating
    } = await getData(params.id, params.location)
    return ( 
        <div className="text-white">
            {name} {params.location}
        </div> 
    );
}
 
export default ViewFeedbackPage;