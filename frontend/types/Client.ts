export type ClientModel = {
  id: string;
  slug: string;
  cnpj: string;
  name: string;
  email: string;
  phoneNumber: string;
}

export type PagedClientModel = {
  clients: ClientModel[];
  count: number;
}

export type SaveClientDTO = {
  slug: string;
  name: string;
  cnpj: string;
  email: string;
  phoneNumber: string;
}