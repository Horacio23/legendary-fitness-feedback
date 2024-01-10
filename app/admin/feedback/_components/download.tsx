"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { DownloadIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface DownloadProps {
    availableLocations: string[]
}

const downloadCsv = (list: any[]) => {
    console.log(list)
    const headers = `Location,Name,Phone,Email,Coach Name,Coach Rating,Suggestions,First Time,Workout Rating,Cleanliness Rating,Recommendation Rating,Return Rating,Feedback Date`
    const csvBody = list.map((item)=> [
            `"${item.location}"`,
            `"${item.name}"`,
            `"${item.phone}"`,
            `"${item.email}"`,
            `"${item.coachName}"`,
            item.coachRating,
            `"${item.suggestions}"`,
            `"${item.firstTime}"`,
            item.workoutRating,
            item.cleanlinessRating,
            item.recommendationRating,
            item.returnRating,
            item.createdAt
    ]
    ).map(e=>e.join(","))
    .join("\n")
    
    const csv = `${headers}\n${csvBody}`

    const element = document.createElement("a");
    const file = new Blob([csv], {type: 'text/csv'});
    element.href = URL.createObjectURL(file);
    element.download = "feedback.csv";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
}

const Download =  ({availableLocations}: DownloadProps) => {
    const handleClick = async () => {
        try{
            const response: any = await axios.get(`/api/${inputLocation}/feedback`)
            downloadCsv(response.data)
            toast.success("Feedback downloaded")
        }catch(error){
            toast.error("There was an error")
            console.log("Error getting feedback", error)
        }

    }

    const [inputLocation, setInputLocation] = useState(availableLocations[0] || "");
    return ( 
        <div className='flex flex-col h-full'>
            <Select value={inputLocation} onValueChange={(value)=> setInputLocation(value)}>
                <SelectTrigger className="w-[250px]">
                    <SelectValue placeholder={inputLocation} />
                </SelectTrigger>
                <SelectContent>
                    {availableLocations.map((loc)=>(
                        <SelectItem key={loc} value={loc}>{loc}</SelectItem>

                    ))}
                </SelectContent>
            </Select>
            <Button
                type='button'
                className='mt-2 bg-red-900/90 text-white capitalize'
                variant="lf"
                onClick={()=>handleClick()}
            >
                <DownloadIcon 
                    className="h-[20px] w-[20px] mr-2" 
                />
                Download
            </Button>
        </div>
     );
}
 
export default Download;