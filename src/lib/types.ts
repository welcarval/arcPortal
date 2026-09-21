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

