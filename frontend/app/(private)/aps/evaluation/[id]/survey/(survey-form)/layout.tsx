import { PropsWithChildren } from "react";
import SurveySteps from "./SurveySteps";

interface Props extends PropsWithChildren {
  params: { id: string };
}

export default function EvaluationSurveyLayout({ params, children }: Props) {
  return (
    <div className="flex flex-row">
      <div className="flex w-3/12">
        <SurveySteps patientId={params.id} />
      </div>
      <div className="w-full">
        {children}
      </div>
    </div>
  )
}
