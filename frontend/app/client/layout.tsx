import { ClientSidebar } from "@/components/Sidebar/ClientSidebar";
import { cookies } from 'next/headers';
import { redirect } from "next/navigation";
import { ReactNode } from "react";

interface Props {
  children: ReactNode
}

export default async function ClientLayout({ children }: Props) {
  const cookieStore = cookies();
  const token = cookieStore.get('cora-jwt')?.value;

  if (!token) {
    redirect('/login');
  }

  const response = await fetch(`${process.env.API_URL}/current-user`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  const result = await response.json();

  console.log(result)

  return (
    <>
      <div>
        <ClientSidebar username={result.name} />
        <main className="py-10 lg:pl-72">
          <div className="px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </>
  )
}
