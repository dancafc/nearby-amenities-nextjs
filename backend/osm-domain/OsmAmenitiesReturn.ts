import {IOsmAmenity} from "./IOsmAmenity";

export type OsmAmenitiesReturn = {
    version: string;
    generator: string;
    osm3s: {
        timestamp_osm_base: string;
        timestamp_areas_base: string;
        copyright: string;
    };
    elements: IOsmAmenity[];
};