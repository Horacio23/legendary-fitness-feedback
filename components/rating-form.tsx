"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { 
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "./ui/form"
import Rating from "./rating"
import { useState } from "react"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import toast from "react-hot-toast"
import { ThankYouModal } from "./modals/thankyou-modal"
import { useConfettiStore } from "@/hooks/use-confetti-store"
import axios from 'axios'
import { useParams, useRouter } from "next/navigation"
 
const formSchema = z.object({
    name: z.string(),
    phone: z.string(),
    email: z.string(),
    firstTime: z.boolean(),
    workoutRating: z.number(),
    cleanlinessRating: z.number(),
    recommendationRating: z.number(),
    returnRating: z.number(),
    coach: z.string(),
    coachRating: z.number(),
    feedback: z.string(),
    
})

const coaches = [
    {
        value: "Solanch",
        label: "Solanch",
    },
    {
        value: "Gabe",
        label: "Gabe",
    },
    {
        value: "Laz",
        label: "Laz",
    },
    {
        value: "Carlos",
        label: "Carlos",
    },
]

const RatingForm = () => {
    const params = useParams<{location: string}>()
    const confetti = useConfettiStore()
    const router = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            phone:"",
            email:"",
            firstTime: false,
            workoutRating:0,
            cleanlinessRating:0,
            recommendationRating:0,
            returnRating:0,
            coach:"",
            coachRating:0,
            feedback:"",
        },
    })

    const [firstTime, setFirstTime] = useState(false);
    const [workoutRating, setWorkoutRating] = useState(0);
    const [cleanlinessRating, setCleanlinessRating] = useState(0);
    const [recommendationRating, setRecommendationRating] = useState(0);
    const [returnRating, setReturnRating] = useState(0);
    const [coachRating, setCoachRating] = useState(0);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log("submitting values")
        values.firstTime = firstTime
        values.workoutRating = workoutRating
        values.cleanlinessRating = cleanlinessRating
        values.recommendationRating = recommendationRating
        values.returnRating = returnRating
        values.coachRating = coachRating
        console.log(values)
        try {
            await axios.post(`/api/${params.location}/feedback/create`, values)
            toast.success("Feedback submitted")
        }catch(error){
            toast.error("Something went wrong")
            console.log(error)
        }
    }

    const thankYouConfirmation = () =>{
        console.log("redirecting")
        router.push("/linktree")
    }
    return ( 
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField 
                    control={form.control}
                    name="firstTime"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex flex-col w-full px-8 items-center py-4">
                                <h1 className="bold-16 uppercase text-lf-10 text-center pb-2">Was today your first class at legendary?</h1>
                                <div className="flex bg-white justify-between px-12 py-1 min-w-[320px] rounded-sm">
                                    <Button 
                                        variant="lf"
                                        type="button"
                                        onClick={()=>setFirstTime(true)}
                                        className={cn(
                                            "px-8 bold-16",
                                            firstTime  && "bg-red-800 text-white"
                                        )}
                                    >
                                        Yes
                                    </Button>
                                    <Button 
                                        variant="lf"
                                        type="button"
                                        onClick={()=>setFirstTime(false)}
                                        className={cn(
                                            "px-8 bold-16",
                                            !firstTime && "bg-red-800 text-white"
                                        )}
                                    >No</Button>
                                </div>
                            </div>
                        </FormItem>
                    )}
                />
                <FormField 
                    control={form.control}
                    name="workoutRating"
                    render={({ field }) => (
                        <FormItem>
                            <Rating 
                            header="what did you think about your workout today?" 
                            ratingHeaders={["Frogettable", "Average", "Legendary"]}
                            scale={5} 
                            onRatingSelect={(rate: number) => setWorkoutRating(rate)} />
                        </FormItem>
                    )}
                />
                <FormField 
                    control={form.control}
                    name="cleanlinessRating"
                    render={({ field }) => (
                        <FormItem>
                            <Rating 
                            header="How would you rate our gym's cleanliness?" 
                            ratingHeaders={["Frogettable", "Average", "Legendary"]}
                            scale={5} 
                            onRatingSelect={(rate: number) => setCleanlinessRating(rate)} />
                        </FormItem>
                    )}
                />
                <FormField 
                    control={form.control}
                    name="recommendationRating"
                    render={({ field }) => (
                        <FormItem>
                            <Rating 
                            header="How likely are you to recommend it to a friend" 
                            ratingHeaders={["Never", "Maybe", "Already Did!"]}
                            scale={5} 
                            onRatingSelect={(rate: number) => setRecommendationRating(rate)} />
                        </FormItem>
                    )}
                />
                <FormField 
                    control={form.control}
                    name="returnRating"
                    render={({ field }) => (
                        <FormItem>
                            <Rating 
                            header="How likely are you to return for another workout" 
                            ratingHeaders={["Never", "Maybe", "Already Booked"]}
                            scale={5} 
                            onRatingSelect={(rate: number) => setReturnRating(rate)} />
                        </FormItem>
                    )}
                />
                <FormField 
                    control={form.control}
                    name="coach"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className="flex flex-col w-full px-8 items-center py-4">
                                    <h1 className="bold-16 uppercase text-lf-10 text-center pb-2">Who was your coach today?</h1>
                                    <div className="flex bg-white justify-between py-1 min-w-[320px] rounded-sm">
                                        <Input placeholder="" {...field} />
                                    </div>
                                </div>

                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField 
                    name="coachRating"
                    render={({ field }) => (
                        <FormItem>
                            <Rating 
                            header="How would you rate the coach today?" 
                            ratingHeaders={["Frogettable", "Average", "Legendary"]}
                            scale={5} 
                            onRatingSelect={(rate: number) => setCoachRating(rate)} />
                        </FormItem>
                    )}
                />
                <FormField 
                    control={form.control}
                    name="feedback"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className="flex flex-col w-full px-8 items-center py-4">
                                    <h1 className="bold-16 uppercase text-lf-10 text-center pb-2">Please share your comments/suggestions with us!</h1>
                                    <div className="flex bg-white justify-between py-1 min-w-[320px] rounded-sm">
                                        <Textarea 
                                            placeholder="" 
                                            className="resize-none"
                                            {...field} 
                                        />
                                    </div>
                                </div>
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField 
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <div className="mx-8 pb-2">
                            <FormItem>
                                <FormLabel className="text-lf-10 bold-18">Name:</FormLabel>
                                <FormControl>
                                    <Input type="text" placeholder="" {...field} />
                                </FormControl>
                            </FormItem>
                        </div>
                    )}
                />
                <FormField 
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <div className="mx-8 pb-2">
                            <FormItem>
                                <FormLabel className="text-lf-10 bold-18">Phone:</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="" {...field} />
                                </FormControl>
                            </FormItem>
                        </div>
                    )}
                />
                <FormField 
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <div className="mx-8 pb-4">
                            <FormItem>
                                <FormLabel className="text-lf-10 bold-18">Email:</FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder="" {...field} />
                                </FormControl>
                            </FormItem>
                        </div>
                    )}
                />
                <div className="flex w-full">
                    <ThankYouModal onConfirm={()=>thankYouConfirmation()}>
                        <Button 
                            type="submit"
                            className="capitalize w-full bg-red-800/90 px-8 mx-8 bold-20 text-slate-100 hover:bg-red-900/90"
                        >submit feedback</Button>
                    </ThankYouModal>
                </div>
                
            </form>
        </Form>
        );
}
 
export default RatingForm;