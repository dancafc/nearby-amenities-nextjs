import {OsmAmenityType} from "./OsmAmenityType";
import {IOsmAmenity, IOsmAmenityTags} from "./IOsmAmenity";

export type OsmDrinkingWaterTags = IOsmAmenityTags & {
    amenity: OsmAmenityType;
    name: string | undefined;
    description: string | undefined;
    maintenance: string | undefined;
    wheelchair: string | undefined;
    check_date: string | undefined;
    fee: string | undefined;
    fountain: string | undefined;
    level: string | undefined;
    bottle: string | undefined;
    opening_hours: string | undefined;
    operator: string | undefined;
    indoor: string | undefined;
    lit: string | undefined;
    covered: string | undefined;
    operational_status: string | undefined;
    seasonal: string | undefined;
};

export type OsmDrinkingWater = IOsmAmenity & {
    type: string;
    id: number;
    lat: number;
    lon: number;
    tags: OsmDrinkingWaterTags;
}