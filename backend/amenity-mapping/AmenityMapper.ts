import {IOsmAmenity} from "@/osm-domain/IOsmAmenity";
import {OsmToilet, OsmToiletTags} from "@/osm-domain/OsmToilet"
import {OsmDrinkingWater, OsmDrinkingWaterTags} from "@/osm-domain/OsmDrinkingWater";
import {OsmAtm, OsmAtmTags} from '@/osm-domain/OsmAtm';
import {IAmenity} from "@/domain/IAmenity";
import {AmenityType} from "@/domain/AmenityType";
import {Toilet} from "@/domain/Toilet";
import {DrinkingWater} from "@/domain/DrinkingWater";
import {Atm} from "@/domain/Atm";

export class AmenityMapper {

    public static MapAmenity(osmAmenity: IOsmAmenity): IAmenity | undefined {
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
            case "drinking_water":
                const osmDrinkingWater: OsmDrinkingWater = {
                    type: osmAmenity.type,
                    id: osmAmenity.id,
                    lat: osmAmenity.lat,
                    lon: osmAmenity.lon,
                    tags: osmAmenity.tags as OsmDrinkingWaterTags,
                }
                return AmenityMapper.MapDrinkingWater(osmDrinkingWater);
            case "atm":
                const osmAtm: OsmAtm = {
                    type: osmAmenity.type,
                    id: osmAmenity.id,
                    lat: osmAmenity.lat,
                    lon: osmAmenity.lon,
                    tags: osmAmenity.tags as OsmAtmTags,
                }
                return AmenityMapper.MapAtm(osmAtm);
            default:
                return undefined;

        }
    };

    public static MapToilet(osmToilet: OsmToilet): Toilet {
        return {
            access: osmToilet.tags.access,
            changingTable: osmToilet.tags.changing_table == 'yes',
            checkDate: osmToilet.tags.check_date && !isNaN(new Date(osmToilet.tags.check_date).getTime())
                ? new Date(osmToilet.tags.check_date)
                : undefined,
            fee: osmToilet.tags.fee,
            female: osmToilet.tags.female == 'yes',
            level: Number(osmToilet.tags.level) || undefined,
            location: {lat: osmToilet.lat, lon: osmToilet.lon},
            male: osmToilet.tags.male == 'yes',
            source: osmToilet.tags.source,
            type: AmenityType.Toilets,
            unisex: osmToilet.tags.unisex == 'yes',
            wheelchair: osmToilet.tags.wheelchair == 'yes',
            operator: osmToilet.tags.operator,
        };
    }

    public static MapDrinkingWater(osmDrinkingWater: OsmDrinkingWater): DrinkingWater {
        return {
            checkDate: osmDrinkingWater.tags.check_date && !isNaN(new Date(osmDrinkingWater.tags.check_date).getTime())
                ? new Date(osmDrinkingWater.tags.check_date)
                : undefined,
            description: osmDrinkingWater.tags.description,
            location: {lat: osmDrinkingWater.lat, lon: osmDrinkingWater.lon},
            maintenance: osmDrinkingWater.tags.maintenance,
            name: osmDrinkingWater.tags.name,
            type: AmenityType.DrinkingWater,
            wheelchair: osmDrinkingWater.tags.wheelchair == 'yes',
            fee: osmDrinkingWater.tags.fee,
            fountain: osmDrinkingWater.tags.fountain,
            level: isNaN(Number(osmDrinkingWater.tags.level)) ? undefined : (Number(osmDrinkingWater.tags.level)),
            bottle: osmDrinkingWater.tags.bottle,
            openingHours: osmDrinkingWater.tags.opening_hours,
            operator: osmDrinkingWater.tags.operator,
            indoor: osmDrinkingWater.tags.indoor == 'yes',
            lit: osmDrinkingWater.tags.lit == 'yes',
            covered: osmDrinkingWater.tags.covered == 'yes',
            operationalStatus: osmDrinkingWater.tags.operational_status,
            seasonal: osmDrinkingWater.tags.seasonal == 'yes',
        }
    }

    public static MapAtm(osmAtm: OsmAtm): Atm {
        return {
            type: AmenityType.ATM,
            location: {lat: osmAtm.lat, lon: osmAtm.lon},
            name: osmAtm.tags.name,
            description: osmAtm.tags.description,
            brand: osmAtm.tags.brand,
            fee: osmAtm.tags.fee == 'yes',
            cost: osmAtm.tags.cost,
            openingHours: osmAtm.tags.opening_hours,
            count: isNaN(Number(osmAtm.tags.count)) ? 1 : (Number(osmAtm.tags.count)),
            indoor: osmAtm.tags.count == 'yes',
            level: isNaN(Number(osmAtm.tags.level)) ? undefined : (Number(osmAtm.tags.level)),
            covered: osmAtm.tags.covered == 'yes',
            lit: osmAtm.tags.lit == 'yes',
            wheelchair: osmAtm.tags.wheelchair == 'yes',
            cashIn: osmAtm.tags.cash_in == 'yes',
            checkDate: osmAtm.tags.check_date && !isNaN(new Date(osmAtm.tags.check_date).getTime())
                ? new Date(osmAtm.tags.check_date)
                : undefined,
            note: osmAtm.tags.note,
        }
    }
}