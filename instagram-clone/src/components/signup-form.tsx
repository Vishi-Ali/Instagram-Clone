"use client";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { GalleryVerticalEnd, Loader2 } from "lucide-react"
import { useState } from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { signUp } from "../../server/users";
import { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { useRouter } from "next/navigation"
import { authClient } from "../../lib/auth-client";

const formSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
})
export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
    // 1. Define your form.
    const [loading, setLoading] = useState(false)
    
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        username: "",
        email: "",
        password: "",
      },
    })
   
    const signUpGoogle = async () => {
      setLoading(true)
        await authClient.signIn.social({
            provider: "google",
            callbackURL: "/dashboard"
        })
      setLoading(false)
    }

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
      setLoading(true)
      const { success } = await signUp(values.username, values.email, values.password)
      if (success) {
        router.push("/dashboard")
      } else {
        console.log("Login failed")
      }
      setLoading(false)
    }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center gap-2">
              <a
                href="#"
                className="flex flex-col items-center gap-2 font-medium"
              >
                <div className="flex size-8 items-center justify-center rounded-md">
                  <GalleryVerticalEnd className="size-6" />
                </div>
                <span className="sr-only">Instagram Clone</span>
              </a>
              <h1 className="text-xl font-bold">Welcome to Instagram Clone</h1>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <a href="/login" className="underline underline-offset-4">
                  Login
                </a>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
              <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Username" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? <Loader2 className="w-4 animate-spin" /> : "Sign Up"}
              </Button>
            </div>
            <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
              <span className="bg-background text-muted-foreground relative z-10 px-2">
                Or
              </span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Button variant="outline" type="button" className="w-full">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                    fill="currentColor"
                  />
                </svg>
                Continue with Apple
              </Button>
              <Button variant="outline" type="button" className="w-full" onClick={signUpGoogle}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                    fill="currentColor"
                  />
                </svg>
                {loading ? <Loader2 className="w-4 animate-spin" /> : "Continue with Google"}
              </Button>
            </div>
          </div>
        </form>
      </Form>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}
