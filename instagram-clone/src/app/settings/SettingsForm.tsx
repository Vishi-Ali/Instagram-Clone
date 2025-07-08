'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  username: z.string().min(1, {
    message: "Please enter valid username.",
  }),
  bio: z.string()
})

interface SettingsFormProps {
  updateSettings: (arg: void) => Promise<boolean>
}

export default function SettingsForm({ updateSettings }: SettingsFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      username: "",
      bio: ""
    },
  })

  async function handleAction() {
    if (await updateSettings() === true) {
      toast.success("Settings updated successfully!")
    } else {
      toast.error("Failed to update settings.")
    }
  }
  
  return (
    <div className="p-5 flex flex-col items-center">
      <div className="flex flex-row justify-center items-center gap-5 m-5">
        <div className="max-w-3xs max-h-3xs">
          <img src="https://picsum.photos/1024" alt="Profile" className="rounded-full" />
        </div>
        <Input className="cursor-pointer" id="picture" type="file" />
      </div>
      
      <Form {...form}>
        <form action={handleAction} className="w-2/3 space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input className="max-w-sm" placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input className="max-w-sm" placeholder="Username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input className="max-w-full max-h-full" placeholder="Bio" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  )
}
