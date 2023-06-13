'use client'

import { handleToastError, handleToastSuccess } from '@/lib/toastify'
import { CreatePatientVitalSignsDTO, PatientVitalSignsModel } from '@/types/HealthRecord'
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
  vitalSigns: PatientVitalSignsModel
}

export function PatientVitalSignsForm({ healthRecordId, vitalSigns }: Props) {
  return (
    <Formik
      initialValues={{
        healthRecordId: healthRecordId,
        temperature: vitalSigns?.temperature ? vitalSigns.temperature : 0,
        diastolicPressure: vitalSigns?.diastolicPressure ? vitalSigns.diastolicPressure : 0,
        systolicPressure: vitalSigns?.systolicPressure ? vitalSigns.systolicPressure : 0,
        heartRate: vitalSigns?.heartRate ? vitalSigns.heartRate : 0,
        respiratoryFrequency: vitalSigns?.respiratoryFrequency ? vitalSigns.respiratoryFrequency : 0,
        oxygenSaturation: vitalSigns?.oxygenSaturation ? vitalSigns.oxygenSaturation : 0
      }}
      validationSchema={schemaValidation}
      onSubmit={async (
        values: CreatePatientVitalSignsDTO,
        { setSubmitting }: FormikHelpers<CreatePatientVitalSignsDTO>
      ) => {
        const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/patient/vital-signs`, {
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
        handleToastSuccess('Sinais vitais cadastrados com sucesso')
      }}
    >
      {(props: FormikProps<CreatePatientVitalSignsDTO>) => (
        <Form>
          <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
            <div className="px-4 py-6 sm:p-8">
              <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-2">
                  <FormInput
                    label="Temperatura (ºC)"
                    name="temperature"
                    type="number"
                  />
                </div>

                <div className="sm:col-span-2">
                  <FormInput
                    label="Pressão Diastólica(mm/Hg)"
                    name="diastolicPressure"
                    type="number"
                  />
                </div>

                <div className="sm:col-span-2">
                  <FormInput
                    label="Pressão Sistólica(mm/Hg)"
                    name="systolicPressure"
                    type="number"
                  />
                </div>

                <div className="sm:col-span-2">
                  <FormInput
                    label="Frequência cardíaca"
                    name="heartRate"
                    type="number"
                  />
                </div>

                <div className="sm:col-span-2">
                  <FormInput
                    label="Frequência respiratória"
                    name="respiratoryFrequency"
                    type="number"
                  />
                </div>

                <div className="sm:col-span-2">
                  <FormInput
                    label="Saturação do oxigênio"
                    name="oxygenSaturation"
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