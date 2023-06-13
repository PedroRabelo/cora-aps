import { getToken } from "@/lib/auth";

const API_ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}/patient/measures`

export async function getMeasuresByHealthRecord(healthRecordId: string) {
  const token = await getToken();

  const response = await fetch(`${API_ENDPOINT}/${healthRecordId}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (response.status === 404) {
    return null
  }

  return await response.json();
}
