import type { Metadata } from "next";
import "../globals.css";
import Leftsidebar from "../../components/layout/leftsidebar";
import {
  ClerkProvider,
  
} from '@clerk/nextjs'
import Topbar from "../../components/layout/Topbar";
 import { ToasterProvider } from "@/lib/ToasterProvider";



 
export const metadata: Metadata = {
  title: "BLVCK-Admin",
  description: "DASHBOARD",
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
          <ToasterProvider/>
          <div className="flex max-lg:flex-col text-grey-1">
          <Leftsidebar />
          <Topbar/>
          <div className="flex-1">
          {children}
          </div>
          </div>
        </body>
      </html>
    </ClerkProvider>
    
  );
}
