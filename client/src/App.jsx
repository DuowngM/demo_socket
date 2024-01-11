import { useEffect, useState } from "react";
import "./App.css";
import io from "socket.io-client";

function App() {
  const [text, setText] = useState("Lộc");
  useEffect(() => {
    // Kết nối đến server socket
    const socket = io("http://localhost:3000");

    // Lắng nghe sự kiện từ server
    socket.on("connection", (data) => {
      console.log("Received message:", data);
    });

    // Thực hiện gửi dữ liệu lên server
    socket.emit("message", text);
    socket.on("message", (data) => {
      console.log("Received message:", data);
    });
    // Hủy bỏ kết nối khi component unmount
    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <>
      <h1>Demo Socket</h1>
    </>
  );
}

export default App;
