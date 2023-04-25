import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

export default function PrivateLayout({ children }: PropsWithChildren) {
  const cookieStore = cookies();
  const token = cookieStore.get('cora-jwt')?.value;

  if (!token) {
    redirect('/login');
  }

  return (
    <>
      {children}
    </>
  )
}