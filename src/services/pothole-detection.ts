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

/**
 * Asynchronously retrieves pothole incidents within a date range.
 *
 * @param startDate The start date for filtering incidents.
 * @param endDate The end date for filtering incidents.
 * @returns A promise that resolves to an array of PotholeIncident objects.
 */
export async function getPotholeIncidents(
  startDate: string,
  endDate: string
): Promise<PotholeIncident[]> {
  // TODO: Implement this by calling an API.

  return [
    {
      location: { lat: 18.5204, lng: 73.8567 },
      timestamp: '2024-07-22T10:00:00Z',
      imageUrl: 'https://example.com/pothole1.jpg',
    },
    {
      location: { lat: 18.5244, lng: 73.8467 },
      timestamp: '2024-07-23T11:30:00Z',
      imageUrl: 'https://example.com/pothole2.jpg',
    },
  ];
}
