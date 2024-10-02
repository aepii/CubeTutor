export const fetchCubeData = async () => {
    try {
        const response = await fetch('/api/cube/');
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Error fetching cube data:', error);
    }
};

// Function to rotate the cube
export const rotateCube = async (face) => {
    try {
        const response = await fetch('/api/cube/rotate/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ face })
        });
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Error updating cube:', error);
    }
};