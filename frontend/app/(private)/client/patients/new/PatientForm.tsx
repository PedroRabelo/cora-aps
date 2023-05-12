'use client'

import { FormInput } from '@/components/FormUI/FormInput'
import { FormInputMask } from '@/components/FormUI/FormInputMask'
import { Button } from '@/components/UI/Button'
import { RadioButton } from '@/components/UI/RadioButton'
import { handleToastError, handleToastSuccess } from '@/lib/toastify'
import { CreatePatientDTO } from '@/types/Patient'
import { BusinessError } from '@/types/errors'
import cpfValidation from '@/utils/cpfValidate'
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Form, Formik, FormikHelpers, FormikProps } from 'formik'
import Link from 'next/link'
import * as Yup from 'yup'
import { getCookie } from 'cookies-next'
import { formatDateJson } from '@/utils/formatDate'

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
        try {
          values.cpf = values.cpf.replace(/[^\d]/g, '');
          values.phoneNumber = values.phoneNumber.replace(/[^\d]/g, '');
          const birthDateJson = formatDateJson(values.birthDate);

          const cpf = cpfValidation(values.cpf)
          if (!cpf) {
            handleToastError('CPF inválido')
            return;
          }

          const payload: CreatePatientDTO = {
            tenantId: values.tenantId,
            cpf: values.cpf,
            name: values.name,
            birthDate: birthDateJson,
            gender: values.gender,
            phoneNumber: values.phoneNumber,
            email: values.email
          }

          const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/patients`, {
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
          handleToastSuccess('Paciente cadastrado com sucesso')
          resetForm();
        } catch (error) {
          console.error(error);
          if (error instanceof BusinessError) {
            if (error.data?.message) {
              handleToastError(error.data.message)
            }
          } else {
            handleToastError('Ocorreu um erro, informe o suporte')
          }
        }
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

                <div className="sm:col-span-2 flex gap-4 items-center">
                  <fieldset id='radio' className="flex flex-row gap-4">
                    <div className="flex items-center gap-2">
                      <RadioButton
                        name="gender"
                        value="F"
                        label="Feminino"
                        onClick={(item) => props.values.gender = item}
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioButton
                        name="gender"
                        value="M"
                        label="Masculino"
                        onClick={(item) => props.values.gender = item}
                      />
                    </div>
                  </fieldset>
                  {props.touched.gender && props.errors.gender ? (
                    <p className="text-sm text-red-600" id="email-error">
                      {props.errors.gender}
                    </p>
                  ) : null}
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
              loading={props.isSubmitting}
              disabled={props.isSubmitting}
            />
          </div>
        </Form>
      )}
    </Formik>
  )
}