import {OsmAmenityType} from "./OsmAmenityType";
import {IOsmAmenity, IOsmAmenityTags} from "./IOsmAmenity";

export type OsmAtmTags = IOsmAmenityTags & {
    amenity: OsmAmenityType;
    name: string | undefined;
    description: string | undefined;
    opening_hours: string | undefined;
    brand: string | undefined;
    cash_in: string | undefined;
    cost: string | undefined;
    fee: string | undefined;
    wheelchair: string | undefined;
    check_date: string | undefined;
    note: string | undefined;
    count: string | undefined;
    indoor: string | undefined;
    level: string | undefined;
    covered: string | undefined;
    lit: string | undefined;
}

export type OsmAtm = IOsmAmenity & {
    type: string;
    id: number;
    lat: number;
    lon: number;
    tags: OsmAtmTags;
}