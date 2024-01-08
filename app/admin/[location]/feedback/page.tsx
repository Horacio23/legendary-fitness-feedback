import { db } from '@/lib/db'
import { DataTable } from './_components/data-table'
import { columns } from './_components/columns'

async function getData(location: string): Promise<any[]> {
    const feedbackList = await db.feedback.findMany({
        where: {
            location
        }
    })

    console.log(feedbackList)
    return feedbackList
}

const ViewFeedbackPage =async ({ 
    params
}:{
    params : { location: string }
}) => {
    const data = await getData(params.location)
    return (
        <main className='bg-lf-90 w-full h-full py-8'>
            <DataTable columns={columns} data={data} />
        </main>
    )
}

export default ViewFeedbackPage;

