import {useForm} from "react-hook-form";
import z from 'zod'
import {zodResolver} from "@hookform/resolvers/zod";
import {MaxWidthWrapper} from "@/components/ui/MaxWidthWrapper.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Link, useNavigate} from "react-router-dom";
import {useAppDispatch} from "@/app/store.ts";
import {register} from "@/slices/UserSlice.ts";

export const signupValidation = z.object({
  email: z.string().email('Should be a valid email.'),
  password: z
    .string()
    .min(5, { message: "Password must be at least 5 characters." })
    .max(32, { message: "Password must be maximum 32 characters." }) ,
  confirmPassword: z
    .string()
    .min(5, { message: "Password must be at least 5 characters." })
    .max(32, { message: "Password must be maximum 32 characters." }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword']
})

export const SignUpForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof signupValidation>>({
    resolver: zodResolver(signupValidation),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleSignup = async ({email, password}:z.infer<typeof signupValidation>) => {
    dispatch(register({email, password}))
    navigate('/')
  }

  return (
    <MaxWidthWrapper className={'flex justify-center'}>
      <Form {...form}>
        <div className="w-full sm:w-2/3 md:w-1/2">
          <h6 className="pt-5 sm:pt-8 text-center font-bold text-3xl">
            Create a new account
          </h6>
          <form
            onSubmit={form.handleSubmit(handleSignup)}
            className="flex flex-col gap-5 w-full mt-4">

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

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage className='text-rose-400' />
                </FormItem>
              )}
            />

            <Button type="submit">
              Sign Up
            </Button>

            <p className="text-center mt-2">
              Already have an account?
              <Link
                to="/sign-in"
                className="text-primary-500 ml-1">
                Log in
              </Link>
            </p>
          </form>
        </div>
      </Form>
    </MaxWidthWrapper>
  );
}