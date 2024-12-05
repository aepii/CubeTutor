# CubeTutor

## Overview

CubeTutor is an application designed to assist users with the Rubik’s Cube, providing features for visualizing the cube's state, accessing solving algorithms, and scanning physical cubes for state detection. The application is built using Django, Django REST Framework (DRF), and Three.js for a seamless 3D rendering experience.

## Technologies Used

- **Frontend**: 
  - Django templates for rendering HTML and managing the UI.
  - JavaScript for interactivity, using Three.js for 3D visualization.

- **Backend**: 
  - Django
  - Django REST Framework

## Core Functionality

1. **Django Backend**:
   - Handles all API requests and responses.
   - Processes cube state data and algorithms.
   - Utilizes Django models to store scraped algorithms and cube states.

2. **Frontend**:
   - User interface built with HTML and CSS.
   - Displays a 3D model of the Rubik's Cube using Three.js.

## Workflow

1. **Cube Representation**:
   - Implements a Python class (OOP) for the Rubik’s Cube, managing the cube’s state and rotation logic.

2. **Data Flow**:
   - **JavaScript**: Sends requests to the Django backend via the DRF API to receive the cube object and its current state.
   - **Python (Django)**: Processes requests, determines necessary algorithms for solving the cube, and responds with a JSON object containing:
     - The current state of the cube.
     - The relevant algorithms.

3. **3D Model Rendering**:
   - **JavaScript**: Receives the cube state and algorithms from the API.
   - Uses Three.js to create and render a 3D model of the cube.
   - Provides functionality for users to play back algorithms visually on the 3D model.

4. **Data Scraping**:
   - **Python (Beautiful Soup)**: Scrapes algorithms from a website and stores them in an SQLite database for later use.

5. **Cube Scanning**:
   - **Python (OpenCV)**: Scans images of the physical Rubik’s Cube to determine its current state and sends this state to the Django backend for processing via the DRF API.

## Additional Considerations

- **User Accounts**: Implement user authentication to allow users to save favorite algorithms or track progress.
- **Error Handling**: Ensure robust error handling in both frontend and backend to manage issues such as failed requests or invalid cube states.
- **Testing**: Implement unit and integration tests to ensure components function as expected.

## Getting Started

Follow these instructions to set up and run the project.

---

### Prerequisites
Ensure you have the following installed:
- Python 3.x
- Node.js
- pip (Python package manager)
- npm (Node.js package manager)

---

### Installing Dependencies
1. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```
2. Install Node.js dependencies:
   ```bash
   npm install
   ```

---

### Setting Up the Database
1. Navigate to the `db` directory:
   ```bash
   cd db
   ```
2. Run the database setup script:
   ```bash
   python main.py
   ```

---

### Setting Up the Web Scraper
1. Navigate to the `web_scraper` directory:
   ```bash
   cd web_scraper
   ```
2. Run the web scraper setup script:
   ```bash
   python main.py
   ```

---

### Running the Server
1. Navigate to the `cube_tutor` directory:
   ```bash
   cd cube_tutor
   ```
2. Apply database migrations:
   ```bash
   python manage.py makemigrations
   ```
3. Start the development server:
   ```bash
   python manage.py runserver
   ```

---

### Accessing the Application
Once the server is running, open your web browser and navigate to:
```
http://127.0.0.1:8000/
```

---

### Notes
- Ensure the database and web scraper setup steps are completed before starting the server.
- For additional configurations or troubleshooting, please refer to the project documentation.
---
