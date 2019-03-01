import { Menu } from '../address/menu';

export class ShipMethods {
    public services = [
        new Menu('UPS Ground', '7.00'),
        new Menu('UPS Two Day', '8.00'),
        new Menu('UPS Next Day', '11.00')
     ];
    constructor(){}
}