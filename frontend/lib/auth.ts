import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getOptions() {
  const token = await getToken();

  return {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }
}

export async function getToken() {
  const cookieStore = cookies();
  const token = cookieStore.get('cora-jwt')?.value;

  if (!token) {
    redirect('/login');
  }

  return token;
}