// import {useLocation, Navigate} from "react-router-dom";

import {useAppSelector} from "@/app/store.ts";
import {Navigate, useLocation} from "react-router-dom";

type PrivateRouteProps = {
  children: JSX.Element,
}
export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const isAuth = useAppSelector(state => state.user.isAuth)
  const location = useLocation();
  if (isAuth) return children
  const url = new URLSearchParams(location.search);
  return <Navigate to={{pathname: '/sign-in', search: url.toString()}} />
}

type PublicRouteProps = {
  children: JSX.Element,
}
export const PublicRoute = ({children}:PublicRouteProps) => {
  const isAuth = useAppSelector(state => state.user.isAuth)
  const location = useLocation();
  if (!isAuth) return children
  const url = new URLSearchParams(location.search);
  return <Navigate to={{pathname: '/', search: url.toString()}} />
}



// type PrivateRouteProps = {
//   children: JSX.Element,
// }
// export const PrivateRoute = ({ children }: PrivateRouteProps) => {
//   const currentUser = useAppSelector(state => state.user.currentUser);
//   const location = useLocation();
//   if (currentUser) return children
//   const url = new URLSearchParams(location.search);
//   // const redirectPath = location.pathname.startsWith('/') ? location.pathname.substring(1) : location.pathname;
//   // url.set('redirect', redirectPath);
//   return <Navigate to={{pathname: '/sign-in', search: url.toString()}} />
//   // return <Navigate
//   //   to={{ pathname: '/sign-in', search: url.toString() }}
//   //   replace
//   // />
// };
//
// type PublicRouteProps = {
//   children: JSX.Element
// }
// export const PublicRoute = ({ children }: PublicRouteProps) => {
//   const currentUser = useAppSelector(state => state.user.currentUser);
//   const location = useLocation();
//   if (!currentUser) return children
//   const url = new URLSearchParams(location.search);
//   return <Navigate to={{pathname: '/', search: url.toString()}} />
//   // return <Navigate
//   //   to={{pathname: url.get('redirect') ? `/${url.get('redirect')}` : '/', search: url.toString()}}
//   //   replace
//   // />
// };