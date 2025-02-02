import {AmenityType} from "@/domain/AmenityType";
import {Location} from "@/domain/Location";

export class Toilet {
    type: AmenityType;
    location: Location;
    access: string | undefined;  //ToDo: add enum
    checkDate: Date | undefined;
    fee: string | undefined;
    female: boolean;
    male: boolean;
    unisex: boolean;
    wheelchair: boolean;
    changingTable: boolean;
    level: number | undefined;
    source: string | undefined;

    constructor(type: AmenityType, lat: number, lon: number, access: string | undefined, checkDate: Date | undefined, fee: string | undefined, female: boolean, male: boolean, unisex: boolean, wheelchair: boolean, changingTable: boolean, level: number | undefined, source: string | undefined) {
        this.type = type;
        this.location = {lat, lon};
        this.access = access;
        this.checkDate = checkDate;
        this.fee = fee;
        this.female = female;
        this.male = male;
        this.unisex = unisex;
        this.wheelchair = wheelchair;
        this.changingTable = changingTable;
        this.level = level;
        this.source = source;

    }
}