import type { ApiRoomDetailsResponse } from "../types";

const API_BASE_URL = "http://localhost:3000/api";

export const fetchRoomDetails = async (
  roomId: string
): Promise<ApiRoomDetailsResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/habitaciones/${roomId}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching room details:", error);
    throw error;
  }
};
