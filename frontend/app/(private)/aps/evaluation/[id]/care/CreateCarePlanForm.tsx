import * as Yup from 'yup'

interface Props {
  healthRecordId: string
}

const schemaValidation = Yup.object({
  startDate: Yup.string().required('Data de nascimento obrigatório'),
  complexity: Yup.string().required('Nome para contato obrigatório'),
  careLineId: Yup.string().required('Telefone obrigatório'),
});

export function CreateCarePlanForm({ healthRecordId }: Props) {

}