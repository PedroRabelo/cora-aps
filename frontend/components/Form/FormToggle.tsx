'use client'

import { Switch } from '@headlessui/react';
import { FieldHookConfig, useField } from 'formik';
import { Fragment } from 'react';

type FormToggleProps = {
  onClickToggle: (checked: boolean) => void;
} & FieldHookConfig<string>;

export default function FormToggle({ onClickToggle, ...props }: FormToggleProps) {
  const [field] = useField(props);

  function handleToggle(checked: boolean) {
    onClickToggle(!checked);
  }

  return (
    <Switch
      name={field.name}
      defaultChecked={Boolean(field.value)}
      as={Fragment}
    >
      {({ checked }) => (
        <button
          className={`${checked ? 'bg-blue-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full`}
          onClick={() => handleToggle(checked)}
        >
          <span className="sr-only">Enable notifications</span>
          <span
            className={`${checked ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition`}
          />
        </button>
      )}
    </Switch>
  );
}
