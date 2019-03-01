export class Faq {
    constructor(
        public question: string,
        public answer: string,
        public sortOrder: number,
        public active: boolean,
        public faqShow: boolean = false,
        public id?: string
    ){}
}