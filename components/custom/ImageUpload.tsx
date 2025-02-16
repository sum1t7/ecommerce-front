"use client";
import { CldUploadWidget } from "next-cloudinary";
import { Button } from "../ui/button";
import { Plus, Trash } from "lucide-react";
import Image from "next/image";
 
interface ImageUploadProps {
  value: string[] ;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}



const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  onRemove,
  value,
}) => {
  
  
  const images: string[] = value;
  
  
  const onSucces = (result: any) => {
    const secureUrl = result.info?.secure_url;
    if (secureUrl) {
      onChange(secureUrl);
      images.push(secureUrl);
      console.log(value);
    } else {
      console.error("Upload failed: secure_url not found");
    }
  };

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-4 items-center">
        
        {value.map((url) => (
          <div key={url} className="relative w-[200px] h-[250px]">
            <div  className="absolute top-0 right-0 z-10">
              <Button
                onClick={() => onRemove(url)}
                type="button"
                size="sm"
                className="bg-red-1 text-white"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image
              src={url}
              key={url}
               width={200}
              height={250}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              alt="collection"
              className="object cover rounded-lg"
               
            />
          </div>
        ))}
      </div>
      <CldUploadWidget uploadPreset="h258lpbl" onSuccess={onSucces} onError={(error) => {
    console.error("Upload failed", error);
  }}>
        {({ open }) => {
          return (
            <Button type="button"
              onClick={() => open()}
              className="bg-grey-1 z-10  text-white"
            >
              <Plus className="h-4 " />
              Upload Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
