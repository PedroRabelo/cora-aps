'use client'

import { handleToastError, handleToastSuccess } from '@/lib/toastify'
import { CreatePatientMeasureDTO, PatientMeasureModel } from '@/types/Patient'
import { CheckIcon } from '@heroicons/react/24/outline'
import { getCookie } from 'cookies-next'
import { Form, Formik, FormikHelpers, FormikProps } from 'formik'
import * as Yup from 'yup'
import { FormInput } from '../FormUI/FormInput'
import { Button } from '../UI/Button'

const schemaValidation = Yup.object({

})

interface Props {
  healthRecordId: string;
  measures: PatientMeasureModel;
}

export function PatientMeasuresForm({ healthRecordId, measures }: Props) {
  return (
    <Formik
      initialValues={{
        healthRecordId: healthRecordId,
        height: measures.height ? measures.height : 0,
        weight: measures.weight ? measures.weight : 0,
        abdominalCircumference: measures.abdominalCircumference ? measures.abdominalCircumference : 0
      }}
      validationSchema={schemaValidation}
      onSubmit={async (
        values: CreatePatientMeasureDTO,
        { setSubmitting }: FormikHelpers<CreatePatientMeasureDTO>
      ) => {
        const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/patient/measures`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getCookie('cora-jwt')}`
          },
          body: JSON.stringify(values)
        })

        const response = await result.json()

        if (response.message?.length > 0) {
          handleToastError(response.message);
          return;
        }

        setSubmitting(false);
        handleToastSuccess('Medidas cadastradas com sucesso')
      }}
    >
      {(props: FormikProps<CreatePatientMeasureDTO>) => (
        <Form>
          <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
            <div className="px-4 py-6 sm:p-8">
              <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-1">
                  <FormInput
                    label="Altura(cm)"
                    name="height"
                    type="number"
                  />
                </div>

                <div className="sm:col-span-1">
                  <FormInput
                    label="Peso(kg)"
                    name="weight"
                    type="number"
                  />
                </div>

                <div className="sm:col-span-2">
                  <FormInput
                    label="Circunferência abdominal"
                    name="abdominalCircumference"
                    type="number"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
              <Button
                type="submit"
                Icon={CheckIcon}
                title="Salvar"
                loading={props.isSubmitting}
                disabled={props.isSubmitting}
              />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  )
}