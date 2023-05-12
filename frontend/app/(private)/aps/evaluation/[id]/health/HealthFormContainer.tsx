import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  title: string
  description: string
}

export function HealthFormContainer({ title, description, children }: Props) {
  return (
    <div className="space-y-10 divide-y divide-gray-900/10">
      <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-4 md:grid-cols-3">
        <div className="px-4 sm:px-0 col-span-1">
          <h2 className="text-base font-semibold leading-7 text-gray-900">{title}</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">{description}</p>
        </div>
        <div className="col-span-2">
          {children}
        </div>
      </div>
    </div>
  )
}