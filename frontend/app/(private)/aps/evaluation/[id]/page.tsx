import { EvaluationHeader } from "./EvaluationHeader";

interface Props {
  params: { id: string };
}

export default function NewEvaluation({ params }: Props) {

  return (
    <div>
      <EvaluationHeader patientId={params.id} />
    </div>
  )
}