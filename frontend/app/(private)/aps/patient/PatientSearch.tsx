'use client'

import { Button } from '@/components/UI/Button'
import { PatientModel, patientStatus } from '@/types/Patient'
import { formatPhoneNumber } from '@/utils/formatTelefone'
import { Combobox } from '@headlessui/react'
import { ChevronRightIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { UsersIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import Link from 'next/link'
import { useState } from 'react'

interface Props {
  patients: PatientModel[]
}

export default function PatientSearch({ patients }: Props) {
  const [query, setQuery] = useState('')

  const filteredPeople =
    query === ''
      ? []
      : patients.filter((person) => {
        return person.name.toLowerCase().includes(query.toLowerCase())
      })

  return (
    <div className="mx-auto max-w-3xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all">
      <Combobox>
        {({ activeOption }: any) => (
          <>
            <div className="relative">
              <MagnifyingGlassIcon
                className="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              <Combobox.Input
                className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                placeholder="Buscar paciente..."
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>

            {(query !== '' && filteredPeople.length > 0) && (
              <Combobox.Options as="div" static hold className="flex divide-x divide-gray-100">
                <div
                  className={clsx(
                    'max-h-96 min-w-0 flex-auto scroll-py-4 overflow-y-auto px-6 py-4',
                    activeOption && 'sm:h-96'
                  )}
                >
                  <div className="-mx-2 text-sm text-gray-700">
                    {filteredPeople.map((person) => (
                      <Combobox.Option
                        as="div"
                        key={person?.id}
                        value={person}
                        className={({ active }) =>
                          clsx(
                            'flex cursor-default select-none items-center rounded-md p-2',
                            active && 'bg-gray-100 text-gray-900'
                          )
                        }
                      >
                        {({ active }) => (
                          <>
                            <span className="flex items-center justify-center h-6 w-6 rounded-full bg-gray-800 text-white">
                              {person?.name.substring(0, 1)}
                            </span>
                            <span className="ml-3 flex-auto truncate">{person?.name}</span>
                            {active && (
                              <ChevronRightIcon
                                className="ml-3 h-5 w-5 flex-none text-gray-400"
                                aria-hidden="true"
                              />
                            )}
                          </>
                        )}
                      </Combobox.Option>
                    ))}
                  </div>
                </div>

                {activeOption && (
                  <div className="hidden max-h-96 w-1/2 flex-none flex-col divide-y divide-gray-100 overflow-y-auto sm:flex">
                    <div className="flex-none p-6 text-center">
                      <span className="flex items-center justify-center text-2xl mx-auto h-16 w-16 rounded-full bg-gray-800 text-white">
                        {activeOption?.name.substring(0, 1)}
                      </span>
                      <h2 className="mt-3 font-semibold text-gray-900">{activeOption?.name}</h2>
                      <p className="text-sm leading-6 text-gray-500">
                        {patientStatus[activeOption?.status]}
                      </p>
                    </div>
                    <div className="flex flex-auto flex-col justify-between p-6">
                      <dl className="grid grid-cols-1 gap-x-6 gap-y-3 text-sm text-gray-700">
                        <dt className="col-end-1 font-semibold text-gray-900">Telefone</dt>
                        <dd>{formatPhoneNumber(activeOption.phoneNumber)}</dd>
                        <dt className="col-end-1 font-semibold text-gray-900">Email</dt>
                        <dd className="truncate">
                          <a href={`mailto:${activeOption.email}`} className="text-indigo-600 underline">
                            {activeOption.email}
                          </a>
                        </dd>
                      </dl>
                      <Link
                        href={`patient/${activeOption.id}/summary`}
                      >
                        <Button
                          type="button"
                          title="Abrir prontuário"
                          className="w-full justify-center"
                        />
                      </Link>

                    </div>
                  </div>
                )}
              </Combobox.Options>
            )}

            {query !== '' && filteredPeople.length === 0 && (
              <div className="px-6 py-14 text-center text-sm sm:px-14">
                <UsersIcon className="mx-auto h-6 w-6 text-gray-400" aria-hidden="true" />
                <p className="mt-4 font-semibold text-gray-900">Nenhum paciente encontrado</p>
                <p className="mt-2 text-gray-500">
                  Não conseguimos encontrar pacientes com este nome. Tente novamente
                </p>
              </div>
            )}
          </>
        )}
      </Combobox>
    </div>
  )
}
