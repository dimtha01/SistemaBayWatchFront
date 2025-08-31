const API_BASE_URL = "http://localhost:3000";

export const fetchRoomViews = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/vistaHabitacion`);
    const result = await response.json();

    if (!result.success) {
      console.error("Error fetching room views:", result.message);
      return [];
    }

    // Transform API data to remove duplicates and format for UI
    const viewsMap = new Map();

    result.data.forEach((view: any) => {
      const key = view.nombre_vista;
      if (!viewsMap.has(key)) {
        viewsMap.set(key, {
          id: view.vista_id.toString(),
          label: view.nombre_vista,
          value: view.nombre_vista,
        });
      }
    });

    return Array.from(viewsMap.values());
  } catch (error) {
    console.error("Error fetching room views:", error);
    return [];
  }
};
