'use client'

import { FormInput } from '@/components/FormUI/FormInput';
import { FormInputArea } from '@/components/FormUI/FormInputArea';
import { FormInputMask } from '@/components/FormUI/FormInputMask';
import { FormSelect } from '@/components/FormUI/FormSelect';
import { Button } from '@/components/UI/Button';
import { handleToastError, handleToastSuccess } from '@/lib/toastify';
import { CareLineModel } from '@/types/CareLine';
import { CreateCarePlanDTO } from '@/types/HealthRecord';
import { CheckIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import { getCookie } from 'cookies-next';
import { Form, Formik, FormikHelpers, FormikProps } from 'formik';
import { useEffect, useState } from 'react';
import * as Yup from 'yup'

interface Props {
  healthRecordId: string
}

const schemaValidation = Yup.object({
  startDate: Yup.string().required('Data de início obrigatória'),
  complexity: Yup.string().required('Complexidade obrigatória'),
  careLineId: Yup.string().required('Linha de cuidado obrigatório'),
});

export function CreateCarePlanForm({ healthRecordId }: Props) {
  const [careLines, setCareLines] = useState<CareLineModel[]>([])

  async function getCareLines() {
    const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/care-line`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getCookie('cora-jwt')}`
      }
    })

    const response = await result.json()
    setCareLines(response)
  }

  useEffect(() => {
    getCareLines()
  }, [])

  return (
    <div>
      <Formik
        initialValues={{
          startDate: '',
          complexity: 'LOW',
          careLineId: '',
          healthRecordId: healthRecordId,
          description: ''
        }}
        validationSchema={schemaValidation}
        onSubmit={async (
          values: CreateCarePlanDTO,
          { setSubmitting, resetForm }: FormikHelpers<CreateCarePlanDTO>
        ) => {
          // TODO verificar se já tem id e chamar o PATCH

          const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/patient/care-plan`, {
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
          handleToastSuccess('Plano de cuidado cadastrado com sucesso')
        }}
      >
        {(props: FormikProps<CreateCarePlanDTO>) => (
          <Form>
            <div>
              <div className="grid grid-cols-6 gap-x-6 gap-y-8 ">
                <div className="col-span-2">
                  <FormInputMask
                    label="Data de início"
                    name="startDate"
                    mask="99/99/9999"
                    onBlur={props.handleBlur}
                    onChange={props.handleChange}
                    value={props.values.startDate}
                  />
                </div>
                <div className="col-span-2">
                  <FormSelect
                    label='Complexidade'
                    name="complexity"
                  >
                    <option value="">Selecione uma complexidade</option>
                    <option value="HIGH">Alta</option>
                    <option value="MEDIUM">Média</option>
                    <option value="LOW">Baixa</option>
                  </FormSelect>
                </div>
                <div className="col-span-2">
                  <FormSelect
                    label='Linha de cuidado'
                    name="careLineId"
                  >
                    <option value="">Selecione uma linha de cuidado</option>
                    {careLines.length > 0 && careLines.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </FormSelect>
                </div>
                <div className="col-span-6">
                  <FormInputArea
                    label="Descrição"
                    name="description"
                  />
                </div>
              </div>
              <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 mt-4 px-4 py-4 sm:px-8">
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
    </div>
  )
}