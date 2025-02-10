import {IAmenity} from "./IAmenity";
import {AmenityType} from "./AmenityType";
import {Location} from "./Location";

export type DrinkingWater = IAmenity & {
    type: AmenityType;
    location: Location;
    name: string | undefined;
    description: string | undefined;
    maintenance: string | undefined;
    wheelchair: boolean;
    checkDate: Date | undefined;
    fee: string | undefined;
    fountain: string | undefined;
    level: number | undefined;
    bottle: string | undefined;
    openingHours: string | undefined;
    operator: string | undefined;
    indoor: boolean;
    lit: boolean;
    covered: boolean;
    operationalStatus: string | undefined;
    seasonal: boolean;
}