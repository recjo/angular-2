
export class Cart {
    constructor(
        public cartId: string,
        public productId: string,
        public qty: number,
        public name: string,
        public price: number,
        public sku: string,
        public sizeName: string,
        public colorName: string,
        public id?: string
    ){}
}