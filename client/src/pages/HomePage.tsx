import {MaxWidthWrapper} from "@/components/ui/MaxWidthWrapper.tsx";
import {useAppDispatch, useAppSelector} from "@/app/store.ts";
import {Button} from "@/components/ui/button.tsx";
import {logout} from "@/slices/UserSlice.ts";


export const HomePage = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user.user)

  const handleLogout = () => {
    dispatch(logout())
  }
  return (
    <MaxWidthWrapper className={'p-20'}>
      <h2 className={'text-center font-bold text-3xl'}>Home page</h2>
      <p>User <span className={'bg-gray-200 inline-block px-2 py-1 rounded'}>{user?.email}</span> is logged in.</p>
      <div>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    </MaxWidthWrapper>
  );
}