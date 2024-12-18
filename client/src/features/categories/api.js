export async function handleGet(id) {
  try {
    const response = await fetch(
      `http://localhost:5000/api/categories/${id}`, // OUR API ENDPOINT
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return await response.json();
  } catch (error) {
    // console.error("Error sending token to backend:", error);
  }
}

export async function handleUpdate(id, body) {
  try {
    const response = await fetch(
      `http://localhost:5000/api/categories/${id}`, // OUR API ENDPOINT
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    return await response.json();
  } catch (error) {
    // console.error("Error sending token to backend:", error);
  }
}

// Add this useEffect to log the updated category whenever it changes
export async function handleLoad() {
  try {
    const response = await fetch(
      "http://localhost:5000/api/categories", // OUR API ENDPOINT
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return await response.json();
  } catch (error) {
    // console.error("Error fetching categories:", error);
  }
}

export async function handleDelete(id) {
  try {
    const response = await fetch(
      `http://localhost:5000/api/categories/${id}`, // OUR API ENDPOINT
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return await response.json();
  } catch (error) {
    // console.error("Error sending token to backend:", error);
  }
}

export async function handleCreate(category) {
  const body = JSON.stringify(category);
  try {
    const response = await fetch(
      `http://localhost:5000/api/categories`, // OUR API ENDPOINT
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      }
    );

    return await response.json();
  } catch (error) {
    // console.error("Error sending token to backend:", error);
  }
}

export async function handleGetCategoryTree(category_id) {
  try {
    const response = await fetch(
      `http://localhost:5000/api/categories/${category_id}/tree`, // OUR API ENDPOINT
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return await response.json();
  } catch (error) {
    // console.error("Error sending token to backend:", error);
  }
}

export async function handleGetCategoryAllTree() {
  try {
    const response = await fetch(
      `http://localhost:5000/api/categories/alltree`, // OUR API ENDPOINT
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return await response.json();
  } catch (error) {
    // console.error("Error sending token to backend:", error);
  }
}
