"use client"
import axios from "axios"
import {Heading} from '@/components/heading'
import {MessageSquare } from 'lucide-react'
import {useForm} from "react-hook-form"
import React, { useState } from 'react'
import * as z from "zod"
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import {zodResolver} from "@hookform/resolvers/zod"
import { formSchema } from './constants'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useRouter } from "next/navigation"
import { ChatCompletionRequestMessage } from "openai"
import Empty from "@/components/Empty"
import Loader from "@/components/Loader"
import { cn } from "@/lib/utils"
import UserAvatar from "@/components/user-avatar"
import BotAvatar from "@/components/bot.avatar"
function ConversationPage() {
  const [messages , setMessages] = useState<ChatCompletionRequestMessage[]>([])
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
    const userMessage:ChatCompletionRequestMessage = {
      role : "user",
      content : values.prompt
    }
    const newMessages = [...messages, userMessage]
    const response = await axios.post("/api/conversation" ,{
      messages : newMessages
    })
    setMessages((current) => [...current , userMessage , response.data]) 

   }catch(err)
   {
    console.log(err)
  }
    finally {
      router.refresh();
    }
   }
   console.log(messages);
  
  return (
    <div>
        <Heading title = "Conversation" 
        description='Our PowerFull Ai Conversational Chat Model'
         icon={MessageSquare} iconColor ="text-violet-500" 
         bgColor = "bg-violet-500/10"/>

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
               placeholder= "How to make a http calls using JavaScript"
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


           {messages.length === 0 && !isLoading && (
           <Empty label="No conversation! ask something "/>
           )}
           <div className = 'flex flex-col gap-y-4'>

            {messages.map((message) => (<div key = {message.content}
            className= {cn("p-4 w-full flex flex-start gap-x-8 rounded-lg" , message.role === "user" ? "bg-white border max-w-5xl mx-auto border-black/10" : "bg-muted  max-w-5xl mx-auto" )}
            >

              {message.role === "user" ?   <UserAvatar/> : <BotAvatar/>}
            
            <p className = 'text-md'>{message.content}
            
            </p>
            </div>))}
           </div>
        </div>
    </div>
  )
}

export default ConversationPage