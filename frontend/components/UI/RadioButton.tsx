interface Props {
  name: string;
  value: string;
  defaultChecked?: boolean;
  label: string;
  onClick: (value: string) => void;
}

export function RadioButton(
  {
    name,
    value,
    defaultChecked = false,
    label,
    onClick
  }: Props) {
  return (
    <div className="flex items-center">
      <input
        id={name}
        name={name}
        type="radio"
        defaultChecked={defaultChecked}
        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
        value={value}
        onClick={(value) => onClick(value.currentTarget.value)}
      />
      <label className="ml-3 block text-sm font-medium leading-6 text-gray-900">
        {label}
      </label>
    </div>
  )
}