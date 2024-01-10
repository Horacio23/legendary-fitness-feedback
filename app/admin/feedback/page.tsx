import Image from 'next/image'
import Download from './_components/download'
import { db } from '@/lib/db'

const getFeedbackLocations = async (): Promise<string[]> =>  {
    const locations = await db.feedback.findMany({
        select: {
            location: true
        },
        distinct: ['location'],
    })

    return locations.map(obj=>obj.location) 
}

const ViewFeedbackPage = async () => {
    const locations:string[] = await getFeedbackLocations()
    return (
    <main className='bg-lf-90 w-full h-full py-8'>
      <div className='flex flex-col w-full items-center'>
            <Image 
            src="/lf-logo.png"
            alt='logo'
            width={100}
            height={100}
            />
            <h2 className='uppercase bold-12 text-white my-1'>Legendary fitness</h2>
            <div className='rounded-lg flex flex-col items-center h-full  p-8 mt-12 bg-slate-800/20 '>
                <p className='uppercase bold-16 text-lf-10 mb-6'>Select location to get feedback </p>
                <Download availableLocations={locations} />
            </div>
       </div>
    </main>
    )
}

export default ViewFeedbackPage;

