'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { postImage } from "../actions";
import { useRouter } from "next/navigation";
import { Loader, LoaderCircle } from "lucide-react";

export default function CreatePage() {
  const [imgUrl, setImgUrl] = useState('');
  const [file, setFile] = useState<File>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (file) {
      const data = new FormData();
      data.set("file", file);
      fetch("/api/files", {
        method: "POST",
        body: data,
      }).then(response => {
        response.json().then(url => setImgUrl(url))
      })
    }
  }, [file])

  return (
    <form onSubmit={async (e) => {
      e.preventDefault();
      setLoading(true);
      const formData = new FormData(e.currentTarget);
      const id = await postImage(formData);
      router.push(`/post/${id}`);
      setLoading(false);
    }} className="flex items-center justify-center gap-5 p-4 w-screen h-full">
      <div>
        <input type="hidden" name="image" value={imgUrl} />
        {imgUrl && (
          <img src={imgUrl} alt="Preview" className="max-w-96 rounded-lg" />
        )}
        {!imgUrl && (
          <Input type="file" id="picture" name="image" className="cursor-pointer" 
            onChange={ev => setFile(ev.target.files?.[0])}
          />
        )}
      </div>
      <div className="flex flex-col items-center min-w-1/2">
        <Input type="text" placeholder="Description" name="description" className="mt-4 w-full h-24" />
        <Button type="submit" variant="outline" className="cursor-pointer mt-4 w-1/2">
          {!loading ? "Publish" : <LoaderCircle className="animate-spin" />}
        </Button>
      </div>
    </form>
  );
}