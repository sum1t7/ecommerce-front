"use client";

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { UserButton } from '@clerk/nextjs'
import { useState } from 'react'
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react'

import { navLinks } from '@/lib/constants'

const Topbar = () => {
  const [drop, setDrop] = useState(false)
  const pathname = usePathname()


  return (
    <div className='sticky top-0 z-20 gap-4 w-full flex justify-between item-center px-8 py-4 bg-blue-2 shadow-xl lg:hidden'>
         <Image src = "/PngItem_6995402.png" alt="logo" width={150} height={70}  />
        <div className="flex gap-8 max-md:hidden">
            {navLinks.map((link)=>(
                <Link href={link.url} key={link.url} className={`flex gap-4 text-body-medium ${pathname === link.url ? 'text-blue-1' : 'text-grey-1'}`}>
                 <p className='py-4'>{link.label}</p>
                </Link>
            ))}
        </div>
        <div className="relative flex gap-4 items-center">
            <Menu className='cursor-pointer md:hidden' onClick={()=>{setDrop(!drop)}} />
              {drop &&  <div className="absolute top-10 right-6 flex flex-col gap-8 p-5 bg-white shadow-xl rounded-lg">
            {navLinks.map((link)=>(
              <Link href={link.url} key={link.url} className="flex gap-4 text-body-medium">
                {link.icon} <p>{link.label}</p>
                </Link>
            ))}
        </div> }
            <UserButton/>
         </div>
    </div>
  )
}

export default Topbar