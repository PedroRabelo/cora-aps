import { PropsWithChildren } from "react";
import { PatientHeader } from "./PatientHeader";
import { PatientSidebar } from "./PatientSidebar";

interface Props extends PropsWithChildren {
  params: { id: string }
}

export default function PatientHealthRecordLayout({ params, children }: Props) {
  return (
    <div>
      {/* @ts-expect-error Server Component */}
      <PatientHeader
        patientId={params.id}
      />
      <div className="flex flex-row">
        <div className="flex w-3/12">
          <PatientSidebar
            patientId={params.id}
          />
        </div>
        <div className="w-full">
          {children}
        </div>
      </div>
    </div>
  )
}