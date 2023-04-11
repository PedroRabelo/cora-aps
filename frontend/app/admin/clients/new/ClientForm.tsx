'use client'

import { FormInput } from '@/components/Form/FormInput'
import { FormInputMask } from '@/components/Form/FormInputMask'
import { Button } from '@/components/UI/Button'
import { SaveClientDTO } from '@/types/Client'
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Form, Formik, FormikHelpers, FormikProps } from 'formik'
import Link from 'next/link'
import * as Yup from 'yup'

const schemaValidation = Yup.object({
  slug: Yup.string().required('Slug obrigatório'),
  cnpj: Yup.string().required('Cnpj obrigatório'),
  name: Yup.string().required('Nome obrigatório'),
  email: Yup.string().email('E-mail informado inválido').required('E-mail obrigatório'),
  phoneNumber: Yup.string().required('Telefone obrigatório')
})

export function ClientForm() {
  return (
    <Formik
      initialValues={{
        slug: '',
        cnpj: '',
        name: '',
        email: '',
        phoneNumber: ''
      }}
      validationSchema={schemaValidation}
      onSubmit={async (
        values: SaveClientDTO,
        { setSubmitting, resetForm }: FormikHelpers<SaveClientDTO>
      ) => {
        console.log(values);
      }}
    >
      {(props: FormikProps<SaveClientDTO>) => (
        <Form>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-lg font-semibold leading-7 text-gray-900">Novo cliente</h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-2">
                  <FormInput
                    label="Slug"
                    name="slug"
                    type="text"
                  />
                </div>

                <div className="sm:col-span-2">
                  <FormInputMask
                    label="CNPJ"
                    mask="99.999.999/9999-99"
                    name="cnpj"
                    onBlur={props.handleBlur}
                    onChange={props.handleChange}
                    value={props.values.cnpj}
                  />
                </div>

                <div className="sm:col-span-full">
                  <FormInput
                    label="Nome"
                    name="name"
                    type="text"
                  />
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
            <Link href="/admin/clients">
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