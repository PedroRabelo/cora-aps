'use client'

import { Combobox } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';
import { useField } from 'formik';
import { useState } from 'react';

export type ComboOption = {
  id: string;
  name: string;
}

type Props = {
  label: string;
  name: string;
  searchList: ComboOption[];
  errorMsg: string;
}

export function ComboboxList({ label, name, searchList, errorMsg }: Props) {
  const [field, meta] = useField({ name });
  const [query, setQuery] = useState('');

  const filteredPeople =
    query === ''
      ? searchList
      : searchList.filter((person) => {
        return person.name.toLowerCase().includes(query.toLowerCase());
      });

  return (
    <div>
      <Combobox
        value={field.value}
        onChange={(value: string) => {
          field.onChange({ target: { value, name } });
        }}
      >
        <Combobox.Label className="block text-sm font-medium text-gray-700">{label}</Combobox.Label>
        <div className="relative mt-1">
          <Combobox.Input
            className={clsx('w-full rounded-md border sm:text-sm bg-white py-2 pl-3 pr-10 shadow-sm', meta.touched && meta.error
              ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500'
              : 'border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
            )}
            onChange={(event) => setQuery(event.target.value)}
            displayValue={(person: ComboOption) => person?.name}
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </Combobox.Button>

          {filteredPeople.length > 0 && (
            <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredPeople.map((person) => (
                <Combobox.Option
                  key={person.id}
                  value={person}
                  className={({ active }) =>
                    clsx(
                      'relative cursor-default select-none py-2 pl-3 pr-9',
                      active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                    )
                  }
                >
                  {({ active, selected }) => (
                    <>
                      <span className={clsx('block truncate', selected && 'font-semibold')}>{person.name}</span>

                      {selected && (
                        <span
                          className={clsx(
                            'absolute inset-y-0 right-0 flex items-center pr-4',
                            active ? 'text-white' : 'text-indigo-600'
                          )}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      )}
                    </>
                  )}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          )}
        </div>
      </Combobox>

      {meta.touched && meta.value.id === '' ? (
        <p className="mt-2 text-sm text-red-600" id="email-error">
          {errorMsg}
        </p>
      ) : null}
    </div>
  );
}
