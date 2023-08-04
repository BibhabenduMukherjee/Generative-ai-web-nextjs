import { LandingContent } from '@/components/main/landing-content';
import { LandingHero } from '@/components/main/landing-hero';
import { LandingNavbar } from '@/components/main/landing-navbar';
import { auth } from '@clerk/nextjs'
import React from 'react'

function LandingPage() {
  const {userId} = auth();
  console.log(userId)

  return (
   <div>
    <LandingNavbar/>
    <LandingHero />
    <LandingContent/>

   </div>

  )
}

export default LandingPage