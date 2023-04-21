import { getToken } from "@/lib/auth";
import { PatientModel } from "@/types/Patient";

export async function listPatientsByTenant(tenantId: string): Promise<PatientModel[]> {
  const token = await getToken();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/patients/tenant/${tenantId}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  })

  return await res.json();
}