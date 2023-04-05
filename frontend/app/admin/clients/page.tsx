import { PageListHeader } from "@/components/PageHeader/PageListHeader";

export default function Clients({ searchParams }: { [key: string]: string | string[] | undefined }) {

  console.log(searchParams)

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <PageListHeader
        title="Clientes"
        createLink="/clients/create"
      />
    </div>
  )
}