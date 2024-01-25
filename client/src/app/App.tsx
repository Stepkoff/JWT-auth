import './globals.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import {SignInPage} from "@/pages/SignInPage.tsx";
import {SignUpPage} from "@/pages/SignUpPage.tsx";
import {HomePage} from "@/pages/HomePage.tsx";
import {useEffect, useLayoutEffect} from "react";
import {setWindowInnerHeightIntoCssVariable} from "@/lib/utils.ts";
import {useAppDispatch, useAppSelector} from "@/app/store.ts";
import {checkAuth, setUserReducerLoading} from "@/slices/UserSlice.ts";
import {PrivateRoute, PublicRoute} from "@/app/routes.tsx";

const AppLayout = () => {
  return (
    <div className={'h-fullScreen'}>
      <Outlet/>
    </div>
  )
}

const router = createBrowserRouter(createRoutesFromElements(
  <Route path={'/'} element={<AppLayout/>}>
    <Route index element={
      <PrivateRoute>
        <HomePage/>
      </PrivateRoute>
      }
    />
    <Route path={'sign-in'} element={
      <PublicRoute>
       <SignInPage/>
      </PublicRoute>
    }/>
    <Route path={'sign-up'} element={
      <PublicRoute>
        <SignUpPage/>
      </PublicRoute>
    }/>
  </Route>
))

export const App = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector(state => state.user)
  console.log('state', state)

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(checkAuth())
    } else {
      dispatch(setUserReducerLoading(false))
    }
  }, [])

  useLayoutEffect(() => {
    window.addEventListener('resize', setWindowInnerHeightIntoCssVariable);
    setWindowInnerHeightIntoCssVariable();
    return () => {
      window.removeEventListener('resize', setWindowInnerHeightIntoCssVariable);
    }
  }, []);

  if(state.isLoading) {
    return (
      <div>Loading....</div>
    )
  }

  return (
    <RouterProvider router={router}/>
  )
}