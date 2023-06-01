'use client'

import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { useField } from 'formik';
import { ComponentProps } from 'react';

type FormInputProps = {
  label: string;
  name: string;
} & ComponentProps<'textarea'>

export function FormInputArea({ label, ...props }: FormInputProps) {
  const [field, meta] = useField(props);

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative mt-1 rounded-md shadow-sm">
        <textarea
          rows={4}
          id={props.name}
          className={clsx('block w-full pr-10 rounded-md sm:text-sm', meta.touched && meta.error
            ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500'
            : 'border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
          )}
          placeholder={props.placeholder}
          {...field}
          {...props}
        />
        {meta.touched && meta.error &&
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
          </div>
        }
      </div>
      {meta.touched && meta.error ? (
        <p className="mt-2 text-sm text-red-600" id="email-error">
          {meta.error}
        </p>
      ) : null}

    </div>
  );
}
