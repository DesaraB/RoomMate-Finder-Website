import axios from "axios";

const rooms_service = async () => {
  const result = await axios.get("http://localhost:3001/api/listings", {
    withCredentials: true,
  });
  return result;
};

const room_by_id_service = async (id) => {
  return await axios.get(`http://localhost:3001/api/listings/${id}`, {
    withCredentials: true,
  });
};

export { rooms_service, room_by_id_service };
