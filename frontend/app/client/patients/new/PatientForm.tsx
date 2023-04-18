'use client'

import { FormInput } from '@/components/Form/FormInput'
import { FormInputMask } from '@/components/Form/FormInputMask'
import { Button } from '@/components/UI/Button'
import { RadioButton } from '@/components/UI/RadioButton'
import { CreatePatientDTO } from '@/types/Patient'
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Form, Formik, FormikHelpers, FormikProps } from 'formik'
import Link from 'next/link'
import * as Yup from 'yup'

const schemaValidation = Yup.object({
  cpf: Yup.string().required('CPF obrigatório'),
  name: Yup.string().required('Nome obrigatório'),
  birthDate: Yup.string().required('Data de nascimento obrigatório'),
  gender: Yup.string().required('Sexo obrigatório'),
  phoneNumber: Yup.string().required('Telefone obrigatório'),
  email: Yup.string().email('E-mail informado inválido').required('E-mail obrigatório')
})

interface Props {
  tenantId: string;
}

export function PatientForm({ tenantId }: Props) {
  return (
    <Formik
      initialValues={{
        tenantId: tenantId,
        cpf: '',
        name: '',
        birthDate: '',
        gender: '',
        phoneNumber: '',
        email: ''
      }}
      validationSchema={schemaValidation}
      onSubmit={async (
        values: CreatePatientDTO,
        { setSubmitting, resetForm }: FormikHelpers<CreatePatientDTO>
      ) => {
        console.log(values);
      }}
    >
      {(props: FormikProps<CreatePatientDTO>) => (
        <Form>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-lg font-semibold leading-7 text-gray-900">Novo paciente</h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <FormInput
                    label="Nome"
                    name="name"
                    type="text"
                  />
                </div>

                <div className="sm:col-span-2">
                  <FormInputMask
                    label="CPF"
                    mask="999.999.999-99"
                    name="cpf"
                    onBlur={props.handleBlur}
                    onChange={props.handleChange}
                    value={props.values.cpf}
                  />
                </div>

                <div className="col-span-2">
                  <FormInputMask
                    label="Data de nascimento"
                    name="birthDate"
                    mask="99/99/9999"
                    onBlur={props.handleBlur}
                    onChange={props.handleChange}
                    value={props.values.birthDate}
                  />
                </div>

                <div className="sm:col-span-1 flex items-center">
                  <fieldset id='radio' className="flex flex-row gap-4">
                    <div className="flex items-center gap-2">
                      <RadioButton
                        name="gender"
                        value="F"
                        defaultChecked={true}
                        label="Feminino"
                        onClick={(item) => props.values.gender = item}
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioButton
                        name="gender"
                        value="M"
                        defaultChecked={true}
                        label="Masculino"
                        onClick={(item) => props.values.gender = item}
                      />
                    </div>
                  </fieldset>
                </div>

                <div className="sm:col-span-4">
                  <FormInput
                    label="E-mail"
                    name="email"
                    type="email"
                  />
                </div>

                <div className="sm:col-span-2">
                  <FormInputMask
                    label="Telefone"
                    mask="(99) 9 9999-9999"
                    name="phoneNumber"
                    onBlur={props.handleBlur}
                    onChange={props.handleChange}
                    value={props.values.phoneNumber}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <Link href="/client/patients">
              <Button
                type="button"
                Icon={XMarkIcon}
                title="Cancelar"
                outline
                loading={false}
              />
            </Link>
            <Button
              type="submit"
              Icon={CheckIcon}
              title="Salvar"
              loading={false}
            />
          </div>
        </Form>
      )}
    </Formik>
  )
}