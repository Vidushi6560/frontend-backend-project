import { useState } from "react";

const responses = {
  "library timing": "The library is open 8 AM to 10 PM.",
  "admission": "Visit admissions.bits-pilani.ac.in",
  "wifi": "Campus WiFi is available in all hostels.",
  "attendance": "Minimum 75% attendance required.",
  "hostel": "Hostels are available for all students."
};

function getReply(input) {
  const lower = input.toLowerCase().trim();
  for (const key of Object.keys(responses)) {
    if (lower.includes(key)) return responses[key];
  }
  return "Sorry, I don't know that.";
}

export default function App() {
  const [messages, setMessages] = useState([
    { text: "Hi 👋 I'm CampusBot!", from: "bot" }
  ]);
  const [input, setInput] = useState("");

  const sendMessage = (text) => {
    const msg = text || input;
    if (!msg.trim()) return;

    setMessages((prev) => [
      ...prev,
      { text: msg, from: "user" },
      { text: getReply(msg), from: "bot" }
    ]);
    setInput("");
  };

  return (
    <div style={s.page}>
      
      {/* HEADER */}
      <div style={s.header}>Campus Chatbot 🎓</div>

      {/* CHAT AREA */}
      <div style={s.chatbox}>
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              ...s.msg,
              alignSelf: m.from === "user" ? "flex-end" : "flex-start",
              background:
                m.from === "user"
                  ? "linear-gradient(135deg,#6c63ff,#8f86ff)"
                  : "#eaeaea",
              color: m.from === "user" ? "#fff" : "#000"
            }}
          >
            {m.text}
          </div>
        ))}
      </div>

      {/* INPUT */}
      <div style={s.inputRow}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Ask something..."
          style={s.input}
        />
        <button onClick={() => sendMessage()} style={s.sendBtn}>
          Send
        </button>
      </div>

      {/* SUGGESTIONS */}
      <div style={s.suggestions}>
        {["library timing", "admission", "wifi", "attendance", "hostel"].map(
          (q, i) => (
            <button key={i} onClick={() => sendMessage(q)} style={s.chip}>
              {q}
            </button>
          )
        )}
      </div>

    </div>
  );
}

const s = {
  page: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    background: "#f6f7fb",
    fontFamily: "Arial"
  },

  header: {
    padding: "15px",
    background: "linear-gradient(135deg,#6c63ff,#a29bfe)",
    color: "white",
    fontSize: "18px",
    fontWeight: "bold",
    textAlign: "center"
  },

  chatbox: {
    flex: 1,
    padding: "15px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    overflowY: "auto"
  },

  msg: {
    padding: "10px 14px",
    borderRadius: "12px",
    maxWidth: "60%",
    fontSize: "14px"
  },

  inputRow: {
    display: "flex",
    padding: "10px",
    gap: "10px",
    background: "#fff",
    borderTop: "1px solid #ddd"
  },

  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ddd"
  },

  sendBtn: {
    padding: "10px 15px",
    borderRadius: "8px",
    border: "none",
    background: "#6c63ff",
    color: "white",
    cursor: "pointer"
  },

  suggestions: {
    display: "flex",
    gap: "8px",
    padding: "10px",
    flexWrap: "wrap"
  },

  chip: {
    padding: "5px 10px",
    borderRadius: "20px",
    border: "1px solid #6c63ff",
    background: "white",
    color: "#6c63ff",
    cursor: "pointer"
  }
};
