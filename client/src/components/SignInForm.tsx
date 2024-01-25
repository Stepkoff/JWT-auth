import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import z from 'zod'
import {MaxWidthWrapper} from "@/components/ui/MaxWidthWrapper.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button, buttonVariants} from "@/components/ui/button.tsx";
import {Link, useNavigate} from "react-router-dom";
import {useAppDispatch} from "@/app/store.ts";
import {login} from "@/slices/UserSlice.ts";

const signInValidation = z.object({
  email: z.string().email('Should be a valid email.'),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." })
    .max(40, { message: "Password must be maximum 40 characters." })
});


export const SignInForm = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof signInValidation>>({
    resolver: zodResolver(signInValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });


  const handleSignIn = async ({email, password}: z.infer<typeof signInValidation>) => {
    dispatch(login({email, password}))
    navigate('/')
  }


  return (
    <MaxWidthWrapper className='flex justify-center'>
      <Form {...form}>
        <div className="w-full sm:w-2/3 md:w-1/2">
          <h6 className={'pt-5 sm:pt-8 text-center font-bold text-3xl'}>Sign In</h6>
          <form
            onSubmit={form.handleSubmit(handleSignIn)}
            className="flex flex-col gap-5 w-full">

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage className='text-rose-400' />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage className='text-rose-400' />
                </FormItem>
              )}
            />

            <Button type="submit">
              Sign in
            </Button>

            <p className="mt-2">
              Don&apos;t have an account?
              <Link
                to="/sign-up"
                className={buttonVariants({ variant: 'link' })}>
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </Form>
    </MaxWidthWrapper>
  );
}