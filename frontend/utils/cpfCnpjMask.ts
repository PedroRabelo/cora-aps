export function formatAsCpfCnpj(valor: string): string | null {
  if (valor.length === 11) {
    return valor
      .trim()
      .replace(/\D/g, '')
      .toString()
      .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  if (valor.length >= 14) {
    return valor
      .trim()
      .replace(/\D/g, '')
      .toString()
      .replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  }

  return valor;
}
