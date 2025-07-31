// client/src/components/ChatBox.jsx
import { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";

export default function ChatBox({
  seekerId,
  providerId,
  listingId,
  currentUserId,
}) {
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");

  const chatId = `${seekerId}_${providerId}_${listingId}`;

  // Merr mesazhet në kohë reale
  useEffect(() => {
    const q = query(
      collection(db, "messages"),
      where("chatId", "==", chatId),
      orderBy("timestamp", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => doc.data());
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [chatId]);

  // Funksion për të dërguar mesazh
  const sendMessage = async () => {
    if (!newMsg.trim()) return;

    await addDoc(collection(db, "messages"), {
      chatId,
      senderId: currentUserId,
      content: newMsg,
      timestamp: serverTimestamp(),
    });

    setNewMsg("");
  };

  return (
    <div className="border rounded-lg p-4 max-w-xl mx-auto">
      <div className="h-64 overflow-y-auto border-b mb-2 p-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-1 ${
              msg.senderId === currentUserId
                ? "text-right text-blue-600"
                : "text-left text-gray-800"
            }`}
          >
            <span className="bg-gray-100 p-1 rounded">{msg.content}</span>
          </div>
        ))}
      </div>
      <div className="flex mt-2">
        <input
          type="text"
          className="flex-1 border rounded px-2 py-1"
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          placeholder="Type a message..."
        />
        <button
          className="ml-2 px-4 py-1 bg-blue-500 text-white rounded"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}
