import Image from 'next/image'
import React from 'react'
interface EmptyProps {
    label : string
}
function Empty({label} : EmptyProps) {
  return (
    <div 
    className = 'h-full p-20 flex flex-col items-center justify-center'
    
    >
        <span className ='text-center text-lg md:text-3xl font-semibold text-purple-500'>
        {label}
        </span>
        <div className = 'relative h-96 w-96'>
            <Image alt='Empty' fill
            src = "/empty.png"
            />
        </div>
    </div>
  )
}

export default Empty