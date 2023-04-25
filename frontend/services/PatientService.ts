import { getOptions, getToken } from "@/lib/auth";
import { PatientModel } from "@/types/Patient";

const API_ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}/patients`

export async function listPatientsByTenant(tenantId: string): Promise<PatientModel[]> {
  const options = await getOptions()

  const res = await fetch(`${API_ENDPOINT}/tenant/${tenantId}`, options)

  return await res.json()
}

export async function listPatientsByStatus(status: string): Promise<PatientModel[]> {
  const options = await getOptions()

  const res = await fetch(`${API_ENDPOINT}/status/${status}`, options)

  return await res.json()
}