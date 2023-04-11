'use client'

import clsx from 'clsx';
import { FieldHookConfig, useField } from 'formik';
import { ComponentProps } from 'react';

type FormSelectProps = {
  label: string;
} & FieldHookConfig<string> & ComponentProps<'select'>

export function FormSelect({ label, ...props }: FormSelectProps) {
  const [field, meta] = useField(props);

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <select
        id={props.name}
        className={clsx('mt-1 block w-full rounded-md py-2 pl-3 pr-10 text-base sm:text-sm', meta.touched && meta.error
          ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500'
          : 'border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500'
        )}
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <p className="mt-2 text-sm text-red-600" id="email-error">
          {meta.error}
        </p>
      ) : null}
    </div>
  );
}
