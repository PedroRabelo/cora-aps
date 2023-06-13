import { listPatientsByTenant } from "@/services/PatientService";
import PatientSearch from "./PatientSearch";
import { getCurrentUser } from "@/services/UserService";

export default async function Patient() {

  const currentUser = await getCurrentUser();
  const patients = await listPatientsByTenant(currentUser.tenantId);

  return (
    <>
      <PatientSearch patients={patients} />
    </>
  )
}