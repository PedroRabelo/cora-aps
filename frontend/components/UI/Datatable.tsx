
interface Props {
  cols: { alias: string; title: string }[]
  rows: any[]
}

export function Datatable({ cols, rows }: Props) {
  return (
    <div className="mt-8 flow-root">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  {cols.map((th, index) => {
                    if (index === 0) {
                      return <th key={index} scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                        {th.title}
                      </th>
                    } else {
                      return <th key={index} scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        {th.title}
                      </th>
                    }
                  })}
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {rows.map((data) => (
                  <tr key={data.id}>
                    {cols.map((td, index) => {
                      if (index === 0) {
                        return <td key={index} className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {data[td.alias]}
                        </td>
                      } else {
                        return <td key={index} className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{data[td.alias]}</td>
                      }
                    })}
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      <a href="#" className="text-indigo-600 hover:text-indigo-900">
                        Editar<span className="sr-only">, {data.name}</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
