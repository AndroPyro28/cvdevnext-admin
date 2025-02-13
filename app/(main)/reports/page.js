import { Button } from '@/components/ui/button'
import { ChevronLeftCircle } from 'lucide-react'
import React from 'react'

const page = () => {
  return (
    <div className='flex flex-col h-full w-full items-center space-y-10'>
        <Button className="bg-[#2b2D42] px-8 py-2 rounded-[25px] self-end mr-10">Resolved Reports</Button>
        <div className=' bg-white h-[45%] w-[95%] rounded-[50px] p-10'>
          <h1 className="text-sm">Village Reports</h1>

        </div>

        <div className=' bg-white  h-[45%] w-[95%] rounded-[50px] p-10'>
        <h1 className="text-sm">System Reports</h1>

        
        </div>
    </div>

  )
}

export default page
