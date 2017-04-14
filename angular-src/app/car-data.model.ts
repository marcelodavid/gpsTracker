import { Owner } from './owner.model';
import { Authorized } from './authorized.model';
export class CarData {
    model: string;
    year: number;
    color: string;
    vehicleNumber: string;
    id: string;
    owner: Owner;
    authorized: Authorized[];
}
