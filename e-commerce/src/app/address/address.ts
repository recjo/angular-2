export class Address {
    constructor(
        public addressId: string,
        public addressType: string,
        public firstName: string,
        public lastName: string,
        public address1: string,
        public address2: string,
        public city: string,
        public state: string,
        public postalCode: string,
        public country: string,
        public phone: string,
        public email: string,
        public id?: string
    ){}
}