import {IAmenity} from "@/domain/IAmenity";
import {AmenityType} from "@/domain/AmenityType";
import {Location} from "@/domain/Location";

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