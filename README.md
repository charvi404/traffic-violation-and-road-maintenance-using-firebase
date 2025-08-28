# 🛠️ Pune Smart Pothole Reporter

A cloud-based web application that enables **citizens to report potholes with images and location**, while the backend uses AI and business logic to estimate **severity, size, repair material, and cost**, and then **notifies municipal authorities** for faster road maintenance in Pune city.

---

## 🌟 Features

- 📸 **Citizen Reporting**
  - Upload pothole images (drag-and-drop)
  - Auto-capture GPS location with editable map pin
  - Add optional description
  - Track status of submitted reports in dashboard

- 🤖 **AI & Business Logic**
  - Pothole detection from uploaded images
  - Size & severity estimation (minor, medium, major, critical)
  - Cost calculation based on material & labor dataset
  - Rule-based recommendation of repair material

- 🗺️ **Authority Dashboard**
  - Map view with color-coded pothole severity
  - Filterable reports table (ID, Location, Severity, Cost, Status)
  - Assign and mark repairs as completed

- 📊 **Transparency**
  - Citizens can view history of their reports
  - Authorities get consolidated reports for wards/regions
  - Export reports as CSV/GeoJSON for municipal systems

---

## 🏗️ Tech Stack

**Frontend**
- React (Lovable-generated UI, editable with Tailwind/Material UI)
- Mapbox / Leaflet for interactive maps
- Axios for API calls

**Backend**
- Node.js / Express REST API (or Flask/FastAPI)
- Cloud Object Storage (AWS S3 / GCP Cloud Storage) for images
- PostgreSQL + PostGIS for geo-data storage
- Business logic engine for cost/material calculation

**AI/ML Pipeline**
- YOLOv8 / U-Net for pothole detection
- MiDaS (monocular depth estimation) for size/volume
- Rule-based severity classifier
- Dataset-driven cost estimator (unit prices of asphalt, sand, labor rates)

**Cloud Infrastructure**
- AWS / GCP (any cloud provider)
- API Gateway + Cloud Run/Lambda
- RDS/Cloud SQL for database
- CI/CD via GitHub Actions
- Monitoring (CloudWatch / Stackdriver)

---

## 📂 Project Structure


