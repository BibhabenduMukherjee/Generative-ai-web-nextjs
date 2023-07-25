import { Button } from '@/components/ui/button'
import { SignIn } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'

function DashboardPage() {
  return (
    <div>
      <Link href={"/sign-in"}><Button variant={"ghost"}>Click me</Button></Link>
    </div>
  )
}

export default DashboardPage