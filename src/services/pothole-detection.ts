/**
 * Represents a geographical location with latitude and longitude coordinates.
 */
export interface Location {
  /**
   * The latitude of the location.
   */
  lat: number;
  /**
   * The longitude of the location.
   */
  lng: number;
}

/**
 * Represents pothole incident details.
 */
export interface PotholeIncident {
  /**
   * The location of the pothole.
   */
  location: Location;
  /**
   * The timestamp of the incident.
   */
  timestamp: string;
  /**
   * Image URL of the pothole (optional).
   */
  imageUrl?: string;
}

import { InferenceHTTPClient } from 'inference_sdk';

const CLIENT = new InferenceHTTPClient({
    api_url: "https://serverless.roboflow.com",
    api_key: "8yaLfqGb62JC5OHaM3o8"
});

/**
 * Asynchronously retrieves pothole incidents within a date range using Roboflow API.
 *
 * @param startDate The start date for filtering incidents.
 * @param endDate The end date for filtering incidents.
 * @returns A promise that resolves to an array of PotholeIncident objects.
 */
export async function getPotholeIncidents(
  startDate: string,
  endDate: string
): Promise<PotholeIncident[]> {
    //TODO: Implement image upload, currently passing "your_image.jpg"
    const result = await CLIENT.infer("your_image.jpg", "road-damage-det/2");

    //Transform the result into PotholeIncident array
    const incidents: PotholeIncident[] = result.predictions.map(pred => ({
        location: {
            lat: pred.top, //Example values, replace with actual latitude if available
            lng: pred.left //Example values, replace with actual longitude if available
        },
        timestamp: new Date().toISOString(), //Current timestamp, replace with image timestamp if available
        imageUrl: null //Image URL, implement retrieval if necessary
    }));
  return incidents;
}
