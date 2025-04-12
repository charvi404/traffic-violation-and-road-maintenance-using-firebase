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
 * Represents wrong parking incident details.
 */
export interface WrongParkingIncident {
  /**
   * The location of the wrong parking.
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
  /**
   * Challan ID for the wrong parking incident (optional).
   */
  challanId?: string;
}

/**
 * Asynchronously retrieves wrong parking incidents within a date range.
 *
 * @param startDate The start date for filtering incidents.
 * @param endDate The end date for filtering incidents.
 * @returns A promise that resolves to an array of WrongParkingIncident objects.
 */
export async function getWrongParkingIncidents(
  startDate: string,
  endDate: string
): Promise<WrongParkingIncident[]> {
  // TODO: Implement this by calling an API.

  return [
    {
      location: { lat: 18.5224, lng: 73.8587 },
      timestamp: '2024-07-22T12:00:00Z',
      imageUrl: 'https://example.com/wrongparking1.jpg',
      challanId: 'CH12345',
    },
    {
      location: { lat: 18.5264, lng: 73.8487 },
      timestamp: '2024-07-23T13:30:00Z',
      imageUrl: 'https://example.com/wrongparking2.jpg',
      challanId: 'CH67890',
    },
  ];
}
