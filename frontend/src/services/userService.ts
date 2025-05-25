import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getCurrentUser = async (token: string) => {
  const response = await axios.get(`${API}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
