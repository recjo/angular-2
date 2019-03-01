
export class Product {
    constructor(
        public name: string,
        public description: string,
        public catId: string,
        public imgTitle: string,
        public img: any,
        public price: number,
        public sku: string,
        public itemWeight: number,
        public active: boolean,
        public sizeName?: string,
        public colorName?: string,
        public id?: string
    ){}
}