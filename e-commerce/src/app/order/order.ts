import { Cart } from '../cart/cart';
import { Address } from '../address/address';

export class Order {
    constructor(
        public shipVia: string,
        public grandTotal: number,
        public subTotal: number,
        public taxTotal: number,
        public shipTotal: number,
        public lastFour: string,
        public exp: string,
        public ccv: string,
        public billing: Address,
        public shipping: Address,
        public orderItems: Cart[],
        public id?: string
    ){}
}