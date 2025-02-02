import {AmenityType} from "@/domain/AmenityType";
import {Location} from "@/domain/Location";
import {IAmenity} from "@/domain/IAmenity";

export type Toilet = IAmenity & {
    type: AmenityType;
    location: Location;
    access: string | undefined;  //ToDo: add enum
    checkDate: Date | undefined;
    fee: string | undefined;
    female: boolean;
    male: boolean;
    unisex: boolean;
    wheelchair: boolean;
    changingTable: boolean;
    level: number | undefined;
    source: string | undefined;
}
