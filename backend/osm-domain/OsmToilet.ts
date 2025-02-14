import {OsmAmenityType} from "./OsmAmenityType";
import {IOsmAmenity, IOsmAmenityTags} from "./IOsmAmenity";

export type OsmToiletTags = IOsmAmenityTags & {
    amenity: OsmAmenityType;
    access: string;
    check_date: string;
    fee: string;
    female: string;
    male: string;
    unisex: string;
    wheelchair: string;
    changing_table: string;
    level: string;
    source: string;
    operator: string;
}

export type OsmToilet = IOsmAmenity & {
    type: string;
    id: number;
    lat: number;
    lon: number;
    tags: OsmToiletTags;
}