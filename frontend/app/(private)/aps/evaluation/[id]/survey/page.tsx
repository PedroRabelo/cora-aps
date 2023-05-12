import { Button } from "@/components/UI/Button";
import Link from "next/link";

interface Props {
  params: { id: string };
}

export default function EvaluationSurvey({ params }: Props) {
  return (
    <Link href={`/aps/evaluation/${params.id}/survey/general-health`}>
      <Button
        title="Iniciar"
      />
    </Link>

  )
}