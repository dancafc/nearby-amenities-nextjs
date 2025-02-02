import {IAmenity} from "@/domain/IAmenity";
import {AmenityType} from "@/domain/AmenityType";
import {Location} from "@/domain/Location";

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
    operator: string | undefined;
}
