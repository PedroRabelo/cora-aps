import { getToken } from "@/lib/auth";

export async function getCurrentUser() {
  const token = await getToken();

  const response = await fetch(`${process.env.API_URL}/current-user`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  return await response.json();
}