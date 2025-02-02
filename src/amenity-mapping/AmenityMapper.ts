import {Toilet} from "@/domain/Toilet";
import {IOsmAmenity} from "@/osm-domain/IOsmAmenity";
import {OsmToilet, OsmToiletTags} from "@/osm-domain/OsmToilet"
import {AmenityType} from "@/domain/AmenityType";

export class AmenityMapper {

    public static MapAmenity(osmAmenity: IOsmAmenity): Toilet | undefined {
        if (typeof osmAmenity.tags == "undefined") {
            console.log("Unexpected json response", osmAmenity);
            return;
        }

        switch (osmAmenity.tags.amenity) {
            case "toilets":
                const osmToilet: OsmToilet = {
                    type: osmAmenity.type,
                    id: osmAmenity.id,
                    lat: osmAmenity.lat,
                    lon: osmAmenity.lon,
                    tags: osmAmenity.tags as OsmToiletTags
                }
                return AmenityMapper.MapToilet(osmToilet);
            default:
                return undefined;

        }
    };

    public static MapToilet(osmAmenity: OsmToilet): Toilet {
        return {
            access: osmAmenity.tags.access,
            changingTable: osmAmenity.tags.changing_table == 'yes',
            checkDate: osmAmenity.tags.check_date && !isNaN(new Date(osmAmenity.tags.check_date).getTime())
                ? new Date(osmAmenity.tags.check_date)
                : undefined,
            fee: osmAmenity.tags.fee,
            female: osmAmenity.tags.female == 'yes',
            level: Number(osmAmenity.tags.level) || undefined,
            location: {lat: osmAmenity.lat, lon: osmAmenity.lon},
            male: osmAmenity.tags.male == 'yes',
            source: osmAmenity.tags.source,
            type: AmenityType.Toilets,
            unisex: osmAmenity.tags.unisex == 'yes',
            wheelchair: osmAmenity.tags.wheelchair == 'yes'
        };
    }
}