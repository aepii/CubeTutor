
export const fetchCubeData = async () => {
    console.log("FETCH API")
    try {
        const response = await fetch('/api/cube/');
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Error fetching cube data:', error);
    }
};

// Function to rotate the cube
export const callCubeRotation = async (face, clockwise) => {
    console.log("POST API")
    try {
        const response = await fetch('/api/cube/rotate/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({face, clockwise})
        });
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Error updating cube:', error);
    }
};