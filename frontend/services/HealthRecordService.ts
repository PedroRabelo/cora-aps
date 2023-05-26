import { postOptions } from "@/lib/auth";
import { CreatePatientHealthRecordDTO } from "@/types/HealthRecord";

const API_ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}/patient/health-record`

export async function findOrCreateHealthRecord(healthRecord: CreatePatientHealthRecordDTO) {
  const options = await postOptions(healthRecord)

  const res = await fetch(`${API_ENDPOINT}`, options)

  return await res.json()
}