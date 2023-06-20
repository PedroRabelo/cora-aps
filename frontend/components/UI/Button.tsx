import { ButtonHTMLAttributes, DetailedHTMLProps, SVGProps } from "react";
import { Spinner } from "./Spinner";
import clsx from "clsx";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  Icon?: React.ForwardRefExoticComponent<Omit<React.SVGProps<SVGSVGElement>, "ref">>
  format?: "ROUNDED" | "SQUARE"
  outline?: boolean
  loading?: boolean
}

export function Button(
  {
    Icon,
    format = "SQUARE",
    outline = false,
    loading = false,
    title,
    type,
    disabled,
    onClick,
    className,
    ...rest
  }: Props) {
  return (
    <>
      {format === "ROUNDED" &&
        <button
          type={type}
          className="rounded-full bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={onClick}
          {...rest}
        >
          {Icon && (
            <Icon className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      }

      {format === "SQUARE" &&
        <button
          type={type}
          className={clsx(outline ? "text-black bg-white hover:bg-gray-100" : "text-white  bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600",
            className, "inline-flex items-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
          )}
          disabled={disabled}
          onClick={onClick}
        >
          {title}
          {loading && (
            <Spinner />
          )}
          {Icon && !loading && (
            <Icon className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      }
    </>
  )
}

//""