import { Button } from '@/components/ui/button'
import { ChevronLeftCircle } from 'lucide-react'
import React from 'react'

const page = () => {
  return (
    <div className=' bg-white h-full w-[95%] rounded-[50px] p-5'>
      <div className='flex space-x-2 items-center hover:bg-slate-100 w-fit py-2 px-3 rounded-md hover:cursor-pointer'>
        <ChevronLeftCircle className='bg-none size-8'strokeWidth={1} />
        <span>Back</span>
      </div>

      <h1>Resolved Reports</h1>
    </div>

  )
}

export default page
