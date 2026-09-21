export type Address = {
    postalCode: string;
    street: string;
    number: string;
    city: string;
    country: string
};

export type User = {
    firstName: string;
    lastName: string;
    email: string;
    birthDate: Date;
    addresses: Address[];
}

export type ViaCepResult = {
    cep: string,
    logradouro: string,
    complemento: string,
    unidade: string,
    bairro: string,
    localidade: string,
    uf: string,
    estado: string,
    regiao: string,
    ibge: string,
    gia: string,
    ddd: string,
    siafi: string
}

