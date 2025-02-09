import {IAmenity} from "@/domain/IAmenity";
import {AmenityType} from "@/domain/AmenityType";
import {Location} from "@/domain/Location";

export type Atm = IAmenity & {
    type: AmenityType;
    location: Location;
}