import { ButtonHTMLAttributes, SVGProps } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  Icon?: React.ForwardRefExoticComponent<Omit<React.SVGProps<SVGSVGElement>, "ref">>
  format?: "ROUNDED" | "SQUARE"
}

export function Button(
  {
    Icon, format = "SQUARE", title, type, ...rest
  }: Props) {
  return (
    <>
      {format === "ROUNDED" &&
        <button
          type={type}
          className="rounded-full bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          {...rest}
        >
          {Icon && (
            <Icon className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      }

      {format === "SQUARE" &&
        <button
          type="button"
          className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {title}
          {Icon && (
            <Icon className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      }
    </>
  )
}