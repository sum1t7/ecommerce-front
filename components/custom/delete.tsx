"use client"
import React, {  useState } from 'react'
import { Button } from '../ui/button'
import { Trash } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import toast from 'react-hot-toast'

 
interface DeleteProps {
  item: string
  id: string
}

const Delete:React.FC<DeleteProps> = ({item, id }) => {
  const [loading,setloading] = useState(true)

  const onDelete = async () =>{
loading && console.log("loading")
    try {
      setloading(true)
      const itemType = item === "product" ? "products" : "collections"
      const res = await fetch(`/api/${itemType}/${id}`,{
        method: "DELETE",
      }) 
       if (res.ok) {
        setloading(false)
        toast.success(`${item} Deleted Successfully`)
        window.location.href = (`/${itemType}`)
      }
    }
    catch(err) {
      console.log("[Collection_DELETE]", err);
      toast.error("Something went wrong, please fucking kill me")
    }
  }

  return (
 <AlertDialog>
 <AlertDialogTrigger asChild>
<Button type='button' className='bg-red-1 text-white'>
    <Trash className='h-4 w-4'/>
</Button>
 </AlertDialogTrigger>
 <AlertDialogContent className='bg-white-1 '>
   <AlertDialogHeader>
     <AlertDialogTitle className='text-red-1'>Are you absolutely sure?</AlertDialogTitle>
     <AlertDialogDescription>
       This action cannot be undone. This will permanently delete {item}.
     </AlertDialogDescription>
   </AlertDialogHeader>
   <AlertDialogFooter>
     <AlertDialogCancel>Cancel</AlertDialogCancel>
     <AlertDialogAction className='bg-red-1 text-white' onClick={onDelete}>Delete</AlertDialogAction>
   </AlertDialogFooter>
 </AlertDialogContent>
</AlertDialog>
)
}

export default Delete