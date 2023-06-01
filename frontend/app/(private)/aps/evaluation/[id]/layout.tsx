import { PropsWithChildren } from "react";
import { EvaluationHeader } from "./EvaluationHeader";
import EvaluationSteps from "./EvaluationSteps";
import { EvaluationProviders } from "./providers";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

interface Props extends PropsWithChildren {
  params: { id: string };
}

export default function EvaluationLayout({ params, children }: Props) {
  return (
    <EvaluationProviders>
      {/* @ts-expect-error Server Component */}
      <EvaluationHeader patientId={params.id} />
      <div className="flex flex-row justify-center gap-6 items-center pb-2">
        <Link href="/aps/evaluation" className="flex items-center gap-2">
          <ArrowLeftIcon className="h-5 w-5" />
          <span className="font-bold">Sair</span>
        </Link>
        <span className="font-bold">Avaliação Inicial</span>
      </div>
      <EvaluationSteps patientId={params.id} />
      <div className="mx-auto py-6">
        {children}
      </div>
    </EvaluationProviders>
  )
}