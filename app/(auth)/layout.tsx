import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
  
} from '@clerk/nextjs'

 
export const metadata: Metadata = {
  title: "BLVCK-Admin",
  description: "Auth",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
         
          {children}
        </body>
      </html>
    </ClerkProvider>
    
  );
}
