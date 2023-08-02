"use client"
import axios from "axios"
import {Heading} from '@/components/heading'
import { Music } from 'lucide-react'
import {useForm} from "react-hook-form"
import React, { useState } from 'react'
import * as z from "zod"
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import {zodResolver} from "@hookform/resolvers/zod"
import { formSchema } from './constants'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useRouter } from "next/navigation"

import Empty from "@/components/Empty"
import Loader from "@/components/Loader"


function MusicPage() {
  const [music , setMusic] = useState<string>("")
  const router= useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver : zodResolver(formSchema),
     defaultValues : {
      prompt : ""
    }
  });
  const isLoading  = form.formState.isSubmitting;

  const onSubmit = async (values : z.infer<typeof formSchema>) =>{
   console.log(values);
   try{
    setMusic("")
    const response = await axios.post("/api/music" , values)
    setMusic(response.data.audio)
    form.reset()
   }catch(err)
   {
    console.log(err)
  }
    finally {
      router.refresh();
    }
   }
   //console.log(messages);
  
  return (
    <div>
        <Heading title = "Music" 
        description='Only a propmt is needed to create music'
         icon={Music} iconColor ="text-emerald-500" 
         bgColor = "bg-emerald-500/10"/>

        <div className = 'px-4 lg:px-8'>
         <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}
          className = 'rounded-lg border w-full p-4 px-3 md:px-6 peer-focus-within:shadow-sm grid grid-cols-2 gap-2'
          >
            <FormField name = "prompt" render = {({field})=>(
              <FormItem className= 'col-span-12 lg:col-span-10'>
              <FormControl className= 'm-0 p-0'>
               <Input 
               disabled = {isLoading}
               {...field}
               placeholder= "Piano solo"
               className = 'border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent'
               />
              </FormControl>
              </FormItem>
            )}/>
             <Button disabled = {isLoading} className= 'col-span-12 lg:col-span-2 w-full' size={"icon"}>Generate</Button>
          </form>
         </Form>

        </div>
        <div className = 'space-y-4 mt-4 '>

        {isLoading && (
          <div className = 'p-8 rounded-lg w-full flex items-center justify-center bg-muted'>
            <Loader/>
          </div>
        )}


           {music.length === 0 && !isLoading && (
           <Empty label="No conversation! ask something "/>
           )}
          <div>
          {music && (
          <audio controls className="w-full mt-8">
            <source src={music} />
          </audio>
        )}
          </div>
        </div>
    </div>
  )
}

export default MusicPage