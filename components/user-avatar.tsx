import { useUser } from '@clerk/nextjs'
import React from 'react'
import { Avatar, AvatarImage } from './ui/avatar';
import { AvatarFallback } from '@radix-ui/react-avatar';

function UserAvatar() {
    const {user} = useUser();
    console.log(user)
  return (
    <div>
      <Avatar className = 'h-8 w-8'>
        <AvatarImage src={user?.profileImageUrl}/>
        <AvatarFallback>
          {user?.firstName?.charAt(0)}
          {user?.lastName?.charAt(0)}
        </AvatarFallback>
      </Avatar>

    </div>
  )
}

export default UserAvatar