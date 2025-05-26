# ProfileMapApp

A responsive React web application to view, search, and manage user profiles with interactive map integration.

## Features

- **Profile Display:** View a list of user profiles with name, photo, and description.
- **Interactive Mapping:** Click "Summary" to view the profile's address on a map (OpenStreetMap via Leaflet).
- **Profile Details:** Click "Details" for a full profile view with contact and interests.
- **Admin Panel:** Add, edit, or delete profiles.
- **Search & Filter:** Search profiles by name and filter by location.
- **Responsive Design:** Works on desktop and mobile.
- **Loading & Error Handling:** Loading spinners and error messages for map and form actions.

## Getting Started

### Installation

1. Clone the repository:
   ```sh
   git clone <your-repo-url>
   ```

2. Install dependencies:
   ```sh
   npm install
   
   ```

3. Start the development server:
   ```sh
   npm run dev
    
   ```

4. Open  (http://localhost:5173) in your browser.

## Usage

- **Profiles:** Browse, search, and filter profiles on the home page.
- **Summary:** Click the "Summary" button to view the profile's location on a map.
- **Details:** Click "Details" for more information about a profile.
- **Admin:** Go to the Admin panel to add, edit, or delete profiles.
- **Create Profile:** Use the "Create Profile" link to add a new profile.

## Tech Stack

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/)
- [Framer Motion](https://www.framer.com/motion/) (animations)
- [React Leaflet](https://react-leaflet.js.org/) (maps)
- [Tailwind CSS](https://tailwindcss.com/) (styling)

 
## Customization

- **Map Provider:** Uses OpenStreetMap by default. You can switch to Google Maps or Mapbox in `MapView.jsx` if desired.
- **Profile Fields:** Add or remove fields in the profile forms and components as needed.

 

 
