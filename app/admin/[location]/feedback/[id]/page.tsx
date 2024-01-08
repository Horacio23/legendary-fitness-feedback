import { db } from "@/lib/db"
import { Feedback } from "@prisma/client"

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
    // const {
    //     name, 
    //     phone, 
    //     email, 
    //     coachName, 
    //     coachRating, 
    //     suggestions, 
    //     firstTime, 
    //     workoutRating,
    //     cleanlinessRating,
    //     recommendationRating,
    //     returnRating
    // } = await getData(params.id, params.location)
    return ( 
        <div className="text-white">
        {/* TODO: create indiviual feedback view*/}
            <h1>Individual feedback page</h1>
        </div> 
    );
}
 
export default ViewFeedbackPage;