// app/page.tsx
import {AmenitiesService} from "@/service/AmenitiesService";
import {OsmAmenityType} from "@/osm-domain/OsmAmenityType";
import {Toilet} from "@/domain/Toilet";

const Page = async () => {
    const amenitiesService = new AmenitiesService();

    // Perform async operations
    amenitiesService.getCurrentLocation();
    const amenities: Toilet[] = await amenitiesService.getNearbyAmenities(OsmAmenityType.toilets, 1000);

    return (
        <div>
            <h1>Amenities</h1>
            <ul>
                {amenities.map((amenity: Toilet) => (
                    <li key={`${amenity.location.lat}-${amenity.location.lon}`}>
                        Lat: {amenity.location.lat}, Lon: {amenity.location.lon}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Page;
