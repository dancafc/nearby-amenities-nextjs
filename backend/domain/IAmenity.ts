import {AmenityType} from "./AmenityType";
import {Location} from "./Location";

export interface IAmenity {
    type: AmenityType;
    location: Location;
}