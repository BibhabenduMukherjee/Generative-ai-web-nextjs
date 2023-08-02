import { auth } from '@clerk/nextjs'
import React from 'react'

function LandingPage() {
  const {userId} = auth();
  console.log(userId)

  return (
    <div className="relative z-20 flex items-center bg-white dark:bg-gray-800">
    <div className="container relative flex flex-col items-center justify-between px-6 py-8 mx-auto">
        <div className="flex flex-col">
            <h1 className="w-full text-4xl font-light text-center text-gray-800 uppercase sm:text-5xl dark:text-white">
                Next generation ai app powered by openai
            </h1>
            <h2 className="w-full max-w-2xl py-8 mx-auto text-xl font-light text-center text-gray-500 dark:text-white">
                A complete NextJS App for ai with variour usefull ai tools asists you to do question answering , image creation , turns prompt into music , video playback with ai 
            </h2>
            <div className="flex items-center justify-center mt-4">
              {userId === null ? <a href="/sign-up" className="px-4 py-2 mr-4 text-white uppercase bg-gray-800 border-2 border-transparent text-md hover:bg-gray-900">
                    Sing-up
                </a> : <a href="/dashboard" className="px-4 py-2 mr-4 text-white uppercase bg-gray-800 border-2 border-transparent text-md hover:bg-gray-900">
                    Dashboard
                </a>}
                {/* <a href="/sign-up" className="px-4 py-2 mr-4 text-white uppercase bg-gray-800 border-2 border-transparent text-md hover:bg-gray-900">
                    Sing-up
                </a> */}
                <a href="#" className="px-4 py-2 text-gray-800 uppercase bg-transparent border-2 border-gray-800 dark:text-white hover:bg-gray-800 hover:text-white text-md">
                    Documentation
                </a>
            </div>
        </div>
        <div className="relative block w-full mx-auto mt-6 md:mt-0">
            <img src="/logo.png" className=" animate-pulse w-[300px] mt-[60px] m-auto md:w-[400px]"/>
        </div>
    </div>
</div>

  )
}

export default LandingPage