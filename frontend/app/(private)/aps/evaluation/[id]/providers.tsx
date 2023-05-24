'use client'

import { SurveyProvider } from "@/contexts/SurveyContext";
import { PropsWithChildren } from "react";
import 'react-toastify/dist/ReactToastify.css';

export function EvaluationProviders({ children }: PropsWithChildren) {
  return (
    <>
      <SurveyProvider>
        {children}
      </SurveyProvider>
    </>
  )
}