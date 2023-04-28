import { Button } from "@/components/UI/Button"
import { calculateAge } from "@/utils/formatDate"
import { formatPhoneNumber } from "@/utils/formatTelefone";
import { AtSymbolIcon, CalendarIcon, PencilIcon, PhoneIcon } from "@heroicons/react/24/outline"

const patient = {
  name: 'Fulano Teste',
  birthDate: new Date('1986-12-23'),
  phoneNumber: '62996242983',
  email: 'fulano@teste.com.br',
}

interface Props {
  patientId: string;
}

export function EvaluationHeader({ patientId }: Props) {

  const patientPhoneNumber = patient?.phoneNumber ? formatPhoneNumber(patient.phoneNumber) : '';

  // TODO Buscar os dados do paciente

  return (
    <div className="mb-4 lg:flex lg:items-center lg:justify-between">
      <div className="min-w-0 flex-1">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          {patient?.name}
        </h2>
        <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <CalendarIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
            {calculateAge(patient?.birthDate)} anos
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <PhoneIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
            {patientPhoneNumber}
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <AtSymbolIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
            {patient?.email}
          </div>
        </div>
      </div>
      <div className="mt-5 flex lg:mt-0 lg:ml-4">
        <span className="ml-3 hidden sm:block">
          <Button
            type="button"
            Icon={PencilIcon}
            title="Editar"
          />
        </span>
      </div>
    </div>
  )
}