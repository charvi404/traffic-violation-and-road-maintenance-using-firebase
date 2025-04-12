# **App Name**: Pune Road Insights

## Core Features:

- Map Visualization: Display a map of Pune with pothole locations, wrong lane detections, and wrongly parked vehicle locations indicated as markers. Markers should be updated dynamically as new data is received.
- Key Metrics Dashboard: Implement a dashboard to display key metrics such as the total number of potholes detected, number of wrong lane detections, and the number of challans issued for wrong parking. Display a list of each type of incident with details.
- Data Filtering: Allow filtering of data displayed on the map and dashboard by date range and incident type (potholes, wrong lane, wrong parking).
- Incident Details: Display detailed information about each incident when a marker on the map is clicked, including location, timestamp, and, if available, an image of the incident. This feature will use a tool to decide which data to display from the set of available data.

## Style Guidelines:

- Primary color: White or light grey for the background to ensure clarity and focus on the data.
- Accent color: Teal (#008080) to highlight key metrics, interactive elements, and map markers.
- Use distinct colors for different incident types on the map (e.g., red for potholes, yellow for wrong lane, blue for wrong parking).
- Use a clear and intuitive layout with the map taking up the majority of the screen space.
- Dashboard elements (key metrics, filters) should be positioned in a sidebar or top bar for easy access.
- Use clear and recognizable icons for different incident types on the map and in the dashboard.

## Original User Request:
create a web dashboard to visualize, status of recognized potholes on the road of city pune using drone and ml model, visualize wrong lane detection of vehicles and challan generated on wrong parked vehicles, here the data will be recieved after ml model processing
  