'use client'

import { CheckCircleIcon } from '@heroicons/react/20/solid'
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const steps = [
  { id: '01', name: 'Saúde geral', href: 'general-health', status: 'current' },
  { id: '02', name: 'Hábitos de vida', href: 'habits', status: 'current' },
  { id: '03', name: 'Saúde mental', href: 'mental-health', status: 'current' },
]

interface Props {
  patientId: string
}

export default function SurveySteps({ patientId }: Props) {
  const pathname = usePathname();

  const URL = `/aps/evaluation/${patientId}/survey`

  return (
    <div className="py-4">
      <nav className="flex justify-center" aria-label="Progress">
        <ol role="list" className="space-y-6">
          {steps.map((step) => (
            <li key={step.name}>
              {step.status === 'complete' ? (
                <Link href={`${URL}/${step.href}`} className="group">
                  <span className="flex items-start">
                    <span className="relative flex h-5 w-5 flex-shrink-0 items-center justify-center">
                      <CheckCircleIcon
                        className="h-full w-full text-indigo-600 group-hover:text-indigo-800"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="ml-3 text-sm font-medium text-gray-500 group-hover:text-gray-900">
                      {step.name}
                    </span>
                  </span>
                </Link>
              ) : pathname.includes(step.href) ? (
                <Link href={`${URL}/${step.href}`} className="flex items-start" aria-current="step">
                  <span className="relative flex h-5 w-5 flex-shrink-0 items-center justify-center" aria-hidden="true">
                    <span className="absolute h-4 w-4 rounded-full bg-indigo-200" />
                    <span className="relative block h-2 w-2 rounded-full bg-indigo-600" />
                  </span>
                  <span className="ml-3 text-sm font-medium text-indigo-600">{step.name}</span>
                </Link>
              ) : (
                <Link href={`${URL}/${step.href}`} className="group">
                  <div className="flex items-start">
                    <div className="relative flex h-5 w-5 flex-shrink-0 items-center justify-center" aria-hidden="true">
                      <div className="h-2 w-2 rounded-full bg-gray-300 group-hover:bg-gray-400" />
                    </div>
                    <p className="ml-3 text-sm font-medium text-gray-500 group-hover:text-gray-900">{step.name}</p>
                  </div>
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  )
}
