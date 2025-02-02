import {AmenityType} from "@/domain/AmenityType";
import {Location} from "@/domain/Location";

export interface IAmenity {
    type: AmenityType;
    location: Location;
}