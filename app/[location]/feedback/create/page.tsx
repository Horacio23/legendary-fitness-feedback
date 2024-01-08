import RatingForm from '@/components/rating-form'
import { Form } from '@/components/ui/form'
import Image from 'next/image'

export default function Home() {
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
        <h1 className='uppercase bold-32 text-white mt-1'>Feedback CARDS</h1>
        <p className='uppercase medium-12 text-lf-10'>dont't hesitate to help us improve!</p>
      </div>
      <div className='border-[1px] border-lf-10 my-4 mx-10 rounded-md'/>
      <div className='flex flex-col items-center'>
        <RatingForm />
      </div>
    </main>
  )
}
