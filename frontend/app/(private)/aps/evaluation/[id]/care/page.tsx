import { PatientRiskFactorsForm } from "@/components/Forms/PatientRiskFactorsForm";
import { findOrCreateHealthRecord } from "@/services/HealthRecordService";
import { PatientHealthRecordModel } from "@/types/HealthRecord";
import { ArrowDownIcon, ArrowUpIcon, HandThumbDownIcon, HandThumbUpIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { CreateCarePlanForm } from "./CreateCarePlanForm";

const stats = [
  { name: 'Saúde Geral', points: '22', result: 'Muito Bom', changeType: 'increase' },
  { name: 'Hábitos de Vida', points: '12', result: 'Bom', changeType: 'increase' },
  { name: 'Saúde Mental', points: '54', result: 'Ruim', changeType: 'decrease' },
]

interface Props {
  params: { id: string };
}

export default async function EvaluationCarePlan({ params }: Props) {

  const healthRecord: PatientHealthRecordModel = await findOrCreateHealthRecord({
    patientId: params.id
  })

  return (
    <div>
      <div>
        <h3 className="text-base font-semibold leading-6 text-gray-900">Resultado do questionário</h3>
        <dl className="mt-4 grid grid-cols-1 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow md:grid-cols-3 md:divide-x md:divide-y-0">
          {stats.map((item) => (
            <div key={item.name} className="px-4 py-5 sm:p-6">
              <dt className="text-base font-normal text-gray-900">{item.name}</dt>
              <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
                <div className="flex items-baseline text-2xl font-semibold text-indigo-600">
                  {item.points}
                </div>

                <div
                  className={clsx(
                    item.changeType === 'increase' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800',
                    'inline-flex items-baseline rounded-full px-2.5 py-0.5 text-sm font-medium md:mt-2 lg:mt-0'
                  )}
                >
                  {item.changeType === 'increase' ? (
                    <HandThumbUpIcon
                      className="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-green-500"
                      aria-hidden="true"
                    />
                  ) : (
                    <HandThumbDownIcon
                      className="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-red-500"
                      aria-hidden="true"
                    />
                  )}

                  <span className="sr-only"> {item.changeType === 'increase' ? 'Increased' : 'Decreased'} by </span>
                  {item.result}
                </div>
              </dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="flex flex-row mt-4 gap-2">
        <div className="flex w-4/12 rounded-lg bg-white shadow p-4">
          <PatientRiskFactorsForm
            healthRecordId={healthRecord.id}
          />
        </div>
        <div className="w-full rounded-lg bg-white shadow p-4">
          <CreateCarePlanForm
            healthRecordId={healthRecord.id}
          />
        </div>
      </div>
    </div>
  )
}