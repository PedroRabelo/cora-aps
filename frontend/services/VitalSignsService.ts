import { getToken } from "@/lib/auth";

const API_ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}/patient/vital-signs`

export async function getVitalSignsByHealthRecord(healthRecordId: string) {
  const token = await getToken();

  const response = await fetch(`${API_ENDPOINT}/${healthRecordId}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  return await response.json();
}