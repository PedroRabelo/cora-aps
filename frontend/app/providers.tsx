'use client'

import { PropsWithChildren } from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export function Providers({ children }: PropsWithChildren) {
  return (
    <>
      <ToastContainer />
      {children}
    </>
  )
}