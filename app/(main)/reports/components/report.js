import { Button } from '@/components/ui/button'
import { useModal } from '@/hooks/useModalStore'
import { useMutateProcessor } from '@/hooks/useTanstackQuery'
import React from 'react'

export const Report = ({data, statusToUpdate, label}) => {

    const resolveReport = useMutateProcessor({
        url:`/report/${data?._id}`,
        method: "PUT",
        key:['reports']
      })
    
      const handleCompleteReport = () => {
        resolveReport.mutate({
          status: statusToUpdate,
        }, {
          onSuccess: (data) => {
    
          },
          onError: (error) => {
    
          }
        })
      }

      const {onOpen} = useModal()
  return (
    <section className="flex justify-between px-5 py-1 rounded-[50px] items-center bg-[#DFE8FA]">
            <div className="flex space-x-10 items-center">
              <div className="w-[250px] text-sm ">{data.rpt_title}</div>
              <div className="w-[250px] text-sm line-clamp-2 capitalize ">{data.rpt_desc}</div>
              <div className="w-[250px] text-sm line-clamp-2 capitalize  ">
                {
                  data?.rpt_image_url && <img onClick={() => onOpen('photo-report-modal', {photoUrl:data?.rpt_image_url })} className="object-contain object-bottom cursor-pointer h-[50px] w-[100px]" src={data?.rpt_image_url} />
                }
                </div>
            </div>
            <Button className="bg-[#2b2D42] px-8 py-2 rounded-[25px] " onClick={handleCompleteReport}>
              {label}
            </Button>
          </section>
  )
}

export default Report
