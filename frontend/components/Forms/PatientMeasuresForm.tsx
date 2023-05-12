'use client'

import { CreatePatientMeasureDTO, CreatePatientVitalSignsDTO } from '@/types/Patient'
import { Form, Formik, FormikHelpers, FormikProps } from 'formik'
import * as Yup from 'yup'
import { FormInput } from '../FormUI/FormInput'
import { FormInputMask } from '../FormUI/FormInputMask'
import { Button } from '../UI/Button'
import { CheckIcon } from '@heroicons/react/24/outline'

const schemaValidation = Yup.object({
  measurementDate: Yup.string().required('Data de aferição obrigatória'),
})

export function PatientMeasuresForm() {
  return (
    <Formik
      initialValues={{
        healthRecordId: '',
        measurementDate: '',
        height: 0,
        weight: 0,
        imc: 0,
        abdominalCircumference: 0
      }}
      validationSchema={schemaValidation}
      onSubmit={async (
        values: CreatePatientMeasureDTO,
        { setSubmitting, resetForm }: FormikHelpers<CreatePatientMeasureDTO>
      ) => {
        console.log(values)
      }}
    >
      {(props: FormikProps<CreatePatientMeasureDTO>) => (
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

                <div className="sm:col-span-1">
                  <FormInput
                    label="IMC"
                    name="imc"
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