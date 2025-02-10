import {IAmenity} from "./IAmenity";
import {AmenityType} from "./AmenityType";
import {Location} from "./Location";

export type Atm = IAmenity & {
    type: AmenityType;
    location: Location;
    name: string | undefined;
    description: string | undefined;
    brand: string | undefined;
    fee: boolean;
    cost: string | undefined;
    openingHours: string | undefined;
    count: number;
    indoor: boolean;
    level: number | undefined;
    covered: boolean;
    lit: boolean;
    wheelchair: boolean;
    cashIn: boolean;
    checkDate: Date | undefined;
    note: string | undefined;
}