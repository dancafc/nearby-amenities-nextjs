import {IAmenity} from "@/domain/IAmenity";
import {AmenityType} from "@/domain/AmenityType";
import {Location} from "@/domain/Location";

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