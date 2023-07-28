"use client"
import {Heading} from '@/components/heading'
import { MessageSquare } from 'lucide-react'
import {useForm} from "react-hook-form"
import React from 'react'
import * as z from "zod"
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import {zodResolver} from "@hookform/resolvers/zod"
import { formSchema } from './constants'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
function ConversationPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver : zodResolver(formSchema),
     defaultValues : {
      prompt : ""
    }
  });
  const isLoading  = form.formState.isSubmitting;

  const onSubmit = async (values : z.infer<typeof formSchema>) =>{
   console.log(values);
   
  }
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
               placeholder= "How to make a http calls using JavaScript"
               className = 'border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent'
               />
              </FormControl>
              </FormItem>
            )}/>
             <Button disabled = {isLoading} className= 'col-span-12 lg:col-span-2'>Generate</Button>
          </form>
         </Form>

        </div>
        <div className = 'space-y-4 mt-4 '>
          messages content
        </div>
    </div>
  )
}

export default ConversationPage