// Define the base URL of your Spring Boot server
const baseUrl = 'http://localhost:8080/api';

// Function to perform GET request to retrieve data
async function getData(endpoint) {
    const response = await fetch(`${baseUrl}/${endpoint}`);
    return await response.json();
}

// Function to perform POST request to create data
async function createData(endpoint, data) {
    const response = await fetch(`${baseUrl}/${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return await response.json();
}

// Function to perform PUT request to update data
async function updateData(endpoint, id, data) {
    const response = await fetch(`${baseUrl}/${endpoint}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return await response.json();
}

// Function to perform DELETE request to delete data
async function deleteData(endpoint, id) {
    const response = await fetch(`${baseUrl}/${endpoint}/${id}`, {
        method: 'DELETE'
    });
    return await response.json();
}
