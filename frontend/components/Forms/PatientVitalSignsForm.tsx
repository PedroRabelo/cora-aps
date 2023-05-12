'use client'

import { CreatePatientVitalSignsDTO } from '@/types/Patient'
import { Form, Formik, FormikHelpers, FormikProps } from 'formik'
import * as Yup from 'yup'
import { FormInput } from '../FormUI/FormInput'
import { FormInputMask } from '../FormUI/FormInputMask'
import { Button } from '../UI/Button'
import { CheckIcon } from '@heroicons/react/24/outline'

const schemaValidation = Yup.object({
  measurementDate: Yup.string().required('Data de aferição obrigatória'),
})

export function PatientVitalSignsForm() {
  return (
    <Formik
      initialValues={{
        healthRecordId: '',
        measurementDate: '',
        temperature: 0,
        diastolicPressure: 0,
        systolicPressure: 0,
        heartRate: 0,
        respiratoryFrequency: 0,
        oxygenSaturation: 0
      }}
      validationSchema={schemaValidation}
      onSubmit={async (
        values: CreatePatientVitalSignsDTO,
        { setSubmitting, resetForm }: FormikHelpers<CreatePatientVitalSignsDTO>
      ) => {
        console.log(values)
      }}
    >
      {(props: FormikProps<CreatePatientVitalSignsDTO>) => (
        <Form>
          <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
            <div className="px-4 py-6 sm:p-8">
              <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-2">
                  <FormInputMask
                    label="Data da aferição"
                    name="measurementDate"
                    mask="99/99/9999"
                    onBlur={props.handleBlur}
                    onChange={props.handleChange}
                    value={props.values.measurementDate}
                  />
                </div>
                <div className="sm:col-span-4"><br /></div>

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
                    name="diastolicPressure"
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