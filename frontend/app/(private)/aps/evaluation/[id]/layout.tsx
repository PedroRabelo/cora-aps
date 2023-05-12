import { PropsWithChildren } from "react";
import { EvaluationHeader } from "./EvaluationHeader";
import EvaluationSteps from "./EvaluationSteps";

interface Props extends PropsWithChildren {
  params: { id: string };
}

export default function EvaluationLayout({ params, children }: Props) {
  return (
    <div>
      {/* @ts-expect-error Server Component */}
      <EvaluationHeader patientId={params.id} />
      <div className="flex flex-col items-center pb-2">
        <span className="font-bold">Avaliação Inicial</span>
      </div>
      <EvaluationSteps patientId={params.id} />
      <div className="mx-auto py-6">
        {children}
      </div>
    </div>
  )
}