import {Toilet} from "@/domain/Toilet";
import {IOsmAmenity} from "@/osm-domain/IOsmAmenity";
import {OsmToilet, OsmToiletTags} from "@/osm-domain/OsmToilet"
import {AmenityType} from "@/domain/AmenityType";

export class AmenityMapper {

    public static MapAmenity(osmAmenity: IOsmAmenity): Toilet | undefined {
        if (typeof osmAmenity.tags == "undefined"){
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

    public static MapToilet (osmAmenity: OsmToilet) : Toilet | undefined {
        return new Toilet(
            AmenityType.Toilets,
            osmAmenity.lat,
            osmAmenity.lon,
            osmAmenity.tags.access,
            osmAmenity.tags.check_date && !isNaN(new Date(osmAmenity.tags.check_date).getTime())
                ? new Date(osmAmenity.tags.check_date)
                : undefined,
            osmAmenity.tags.fee,
            osmAmenity.tags.female == 'yes',
            osmAmenity.tags.male == 'yes',
            osmAmenity.tags.unisex == 'yes',
            osmAmenity.tags.wheelchair == 'yes',
            osmAmenity.tags.changing_table == 'yes',
            Number(osmAmenity.tags.level) || undefined,
            osmAmenity.tags.source,
        );
    }
}