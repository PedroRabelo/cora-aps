import { differenceInYears, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function formatDateOnly(responseDate?: Date) {
  if (responseDate) {
    const dateStr: string = new Date(responseDate).toString();
    const date = new Date(dateStr);
    const result = new Date(date.toISOString().slice(0, -1));

    return format(new Date(result), 'dd/MM/yyyy', { locale: ptBR });
  }

  return '';
}

export function formatDateJson(responseDate?: string) {
  if (responseDate) {
    const date: string[] = responseDate.split('/');

    const result = date[1].concat('-').concat(date[0]).concat('-').concat(date[2]);

    return format(new Date(result), 'yyyy-MM-dd');
  }

  return '';
}

export function calculateAge(responseDate?: Date) {
  if (responseDate) {
    const date = new Date(responseDate);
    return differenceInYears(new Date(), date);
  }
  return '';
}
