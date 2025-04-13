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
 * Represents wrong lane detection incident details.
 */
export interface WrongLaneDetection {
  /**
   * The location of the wrong lane detection.
   */
  location: Location;
  /**
   * The timestamp of the incident.
   */
  timestamp: string;
  /**
   * Image URL of the incident (optional).
   */
  imageUrl?: string;
}

import { InferenceHTTPClient } from 'inference_sdk';

const CLIENT = new InferenceHTTPClient({
    api_url: "https://serverless.roboflow.com",
    api_key: "8yaLfqGb62JC5OHaM3o8"
});

/**
 * Asynchronously retrieves wrong lane detection incidents within a date range using Roboflow API.
 *
 * @param startDate The start date for filtering incidents.
 * @param endDate The end date for filtering incidents.
 * @returns A promise that resolves to an array of WrongLaneDetection objects.
 */
export async function getWrongLaneDetections(
  startDate: string,
  endDate: string
): Promise<WrongLaneDetection[]> {
    //TODO: Implement image upload, currently passing "your_image.jpg"
    const result = await CLIENT.infer("your_image.jpg", "wrong-way-driving-detection/2");

    //Transform the result into WrongLaneDetection array
    const incidents: WrongLaneDetection[] = result.predictions.map(pred => ({
        location: {
            lat: pred.top, //Example values, replace with actual latitude if available
            lng: pred.left //Example values, replace with actual longitude if available
        },
        timestamp: new Date().toISOString(), //Current timestamp, replace with image timestamp if available
        imageUrl: null //Image URL, implement retrieval if necessary
    }));
  return incidents;
}
