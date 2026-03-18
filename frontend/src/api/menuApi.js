import axios from "axios";
export const fetchMenu = async () => {
  const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/menu`);
  return res.data;
};
