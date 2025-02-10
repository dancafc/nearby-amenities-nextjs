import {OsmAmenityType} from "./OsmAmenityType";

export interface IOsmAmenityTags {
    amenity: string;
}

export interface IOsmAmenity {
    type: OsmAmenityType;
    id: number;
    lat: number;
    lon: number;
    tags: IOsmAmenityTags;
}