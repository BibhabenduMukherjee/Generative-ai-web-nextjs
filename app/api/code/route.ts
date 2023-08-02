import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import {ChatCompletionRequestMessage, Configuration , OpenAIApi} from "openai"
const configuration = new Configuration({
    apiKey : process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(configuration)
const insmg : ChatCompletionRequestMessage = {
    role : "system",
    content : "You are a code generator made using openai and Bibhabendu's development skills. You must answer only in markdown code snippets. Use code comments for explanation"
}
export async function POST(req : Request, res : Response){
    try {

        const {userId} = auth();
        const body = await req.json();
        const {messages} = body;
        if(!userId) return new NextResponse("UnAuthorized" , {status:401})
        if(!configuration.apiKey) return new NextResponse("OpenAI API key not configured" , {status:500})
        if(!messages) return new NextResponse("Messages are required" , {status:400})

        const response = await openai.createChatCompletion({
            model : "gpt-3.5-turbo",
            messages: [insmg, ...messages]
        })
        return NextResponse.json(response.data.choices[0].message)
    }catch(err){
        console.log("[CODE_ERROR]" , err);
        return new NextResponse("Internal error" , {status:500})
        
    }
}