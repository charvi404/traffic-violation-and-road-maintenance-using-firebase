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

/**
 * Asynchronously retrieves wrong lane detection incidents within a date range.
 *
 * @param startDate The start date for filtering incidents.
 * @param endDate The end date for filtering incidents.
 * @returns A promise that resolves to an array of WrongLaneDetection objects.
 */
export async function getWrongLaneDetections(
  startDate: string,
  endDate: string
): Promise<WrongLaneDetection[]> {
  // TODO: Implement this by calling an API.

  return [
    {
      location: { lat: 18.5214, lng: 73.8577 },
      timestamp: '2024-07-22T11:00:00Z',
      imageUrl: 'https://example.com/wronglane1.jpg',
    },
    {
      location: { lat: 18.5254, lng: 73.8477 },
      timestamp: '2024-07-23T12:30:00Z',
      imageUrl: 'https://example.com/wronglane2.jpg',
    },
  ];
}
