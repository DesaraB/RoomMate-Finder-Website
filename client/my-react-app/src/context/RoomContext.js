import { createContext, useContext, useState, useEffect } from "react";
import { rooms_service, room_by_id_service } from "../Services/rooms";
const RoomContext = createContext({});
const RoomProvider = (props) => {
  const [rooms, setRooms] = useState({});

  useEffect(() => {
    allRooms();
  }, []);

  const allRooms = async () => {
    try {
      const result = await rooms_service();
      //console.log("result--in RoomProvider--", result);
      if (result.data.status === 200) {
        setRooms(result.data.user);
        return result.data.user;
      }
    } catch (error) {
      console.log("error--in allRooms--", error);
      throw error;
    }
  };

  const roomById = async (id) => {
  try {
    const result = await room_by_id_service(id);
    // Log to debug
    console.log("Fetched room:", result.data);

    return result.data; // assuming result.data is the room object
  } catch (error) {
    console.log("error--in roomById--", error);
    return null;
  }
};

  const values = { rooms, roomById };

  return (
    <RoomContext.Provider value={values}>{props.children}</RoomContext.Provider>
  );
};
const useRoomContext = () => {
  return useContext(RoomContext);
};

export { RoomProvider, useRoomContext };
