"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'

import { navLinks } from '@/lib/constants'


const Leftsidebar = () => {
    const pathname = usePathname()
  return (
    <div className='h-screen left-0 top-0 sticky p-10 flex flex-col gap-16 bg-blue-2 shadow-lg max-lg:hidden'> 
      <Image src = "/PngItem_6995402.png" alt="logo" width={100} height={100}  />
        <div className="flex flex-col gap-12">
            {navLinks.map((link)=>(
                <Link href={link.url} key={link.url} className={`flex gap-4 text-body-medium ${pathname === link.url ? 'text-blue-1' : 'text-grey-1'}`}>
                {link.icon} <p>{link.label}</p>
                </Link>
            ))}
        </div>
        <div className="flex gap-4 text-body-medium items-center">
            <UserButton/>
            <p>Edit Profile</p>
        </div>
    </div>
  )
}

export default Leftsidebar