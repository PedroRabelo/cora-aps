'use client'

import { handleToastError, handleToastSuccess } from "@/lib/toastify";
import { AddRiskFactorDTO, HealthRecordRiskFactorModel, RiskFactorModel } from "@/types/HealthRecord";
import { getCookie } from "cookies-next";
import { Form, Formik, FormikHelpers, FormikProps } from "formik";
import { useEffect, useState } from "react";
import * as Yup from 'yup'
import { ComboboxList } from "../FormUI/FormCombobox";
import { Button } from "../UI/Button";
import { PlusIcon } from "@heroicons/react/24/outline";

interface Props {
  healthRecordId: string;
}

type NewPatientRiskFactorForm = {
  riskFactor: { id: '', name: '' }
}

const schemaValidation = Yup.object({
  riskFactor: Yup.object({
    id: Yup.string().required('Informe o cliente')
  }).required('Informe o cliente'),
})

export function PatientRiskFactorsForm({ healthRecordId }: Props) {
  const [riskFactors, setRiskFactors] = useState<RiskFactorModel[]>([])
  const [ehrRiskFactors, setEhrRiskFactors] = useState<HealthRecordRiskFactorModel[]>([])

  async function getRiskFactors() {
    const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/patient/health-record/risk-factors`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getCookie('cora-jwt')}`
      }
    })

    const response = await result.json()
    setRiskFactors(response)
  }

  async function getPatientRiskFactors() {
    const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/patient/health-record/risk-factors/${healthRecordId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getCookie('cora-jwt')}`
      }
    })

    const response = await result.json()
    setEhrRiskFactors(response)
  }

  useEffect(() => {
    getRiskFactors()
    getPatientRiskFactors()
  }, [])

  async function handleRemoveRiskFactor(id: string) {
    const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/patient/health-record/risk-factor/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getCookie('cora-jwt')}`
      }
    })

    if (result.status >= 400) {
      handleToastError('Ocorreu um erro ao remover o fator de risco')
      const error = await result.json()
      console.error(error)
    }

    handleToastSuccess('Fator de risco removido.')
    getPatientRiskFactors()
  }

  return (
    <div>
      <Formik
        initialValues={{
          riskFactor: { id: '', name: '' }
        }}
        validationSchema={schemaValidation}
        onSubmit={async (
          values: NewPatientRiskFactorForm,
          { setSubmitting, resetForm }: FormikHelpers<NewPatientRiskFactorForm>
        ) => {
          if (ehrRiskFactors.some((risk) => risk.riskFactor.id === values.riskFactor.id)) {
            handleToastError('Fator de risco já adicionado');
            resetForm()
            return;
          }

          const payload: AddRiskFactorDTO = {
            healthRecordId,
            riskFactorId: values.riskFactor.id
          }

          const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/patient/health-record/risk-factor`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${getCookie('cora-jwt')}`
            },
            body: JSON.stringify(payload)
          })

          const response = await result.json()

          if (response.message?.length > 0) {
            handleToastError(response.message);
            return;
          }

          setSubmitting(false);
          handleToastSuccess('Fator de risco adicionado')
          resetForm()
          getPatientRiskFactors()
        }}
      >
        {(props: FormikProps<NewPatientRiskFactorForm>) => (
          <Form>
            <div className="grid max-w-xl grid-cols-4 gap-x-6 gap-y-8 border-b border-gray-900/10 ">
              <div className="sm:col-span-3">
                {riskFactors && riskFactors?.length > 0 &&
                  <ComboboxList
                    label="Fator de risco"
                    name="riskFactor"
                    searchList={riskFactors}
                    errorMsg="Informe o fator de risco"
                  />
                }
              </div>
              <div className="flex items-center justify-end py-6 sm:px-2">
                <Button
                  type="submit"
                  format="ROUNDED"
                  Icon={PlusIcon}
                  title="Adicionar"
                  loading={props.isSubmitting}
                  disabled={props.isSubmitting}
                />
              </div>
            </div>
          </Form>
        )}
      </Formik>
      <div className="flex flex-col gap-4 pt-4">
        {ehrRiskFactors && ehrRiskFactors.length > 0 && ehrRiskFactors.map((risk) => (
          <span
            key={risk.id}
            className="inline-flex items-center justify-between rounded-full bg-indigo-100 py-0.5 pl-2.5 pr-1 text-lg font-medium text-indigo-700">
            {risk.riskFactor.name}
            <button
              type="button"
              className="mr-2 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:bg-indigo-500 focus:text-white focus:outline-none"
              onClick={() => handleRemoveRiskFactor(risk.id)}
            >
              <span className="sr-only">Remove Risk Factor</span>
              <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
              </svg>
            </button>
          </span>
        ))}
      </div>
    </div>
  )
}