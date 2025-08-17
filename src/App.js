import { useState, useEffect } from "react";

export default function App() {
  const [lang, setLang] = useState("en");
  const [movie, setMovie] = useState(null);
  const [comments, setComments] = useState([
    { id: 1, user: "Alice", time: "00:15:23", text: "Brilliant transition scene!" },
    { id: 2, user: "Bob", time: "01:02:10", text: "This twist changed everything." },
  ]);
  const [newComment, setNewComment] = useState("");
  const [newTime, setNewTime] = useState("");

  useEffect(() => {
    const mockData = {
      en: {
        title: "Inception",
        description: "A thief who steals corporate secrets through the use of dream-sharing technology.",
      },
      ru: {
        title: "Начало",
        description: "Вор, похищающий корпоративные секреты с помощью технологии проникновения в сны.",
      },
      fr: {
        title: "Inception",
        description: "Un voleur qui dérobe des secrets d'entreprise grâce à la technologie du partage de rêves.",
      },
      de: {
        title: "Inception",
        description: "Ein Dieb, der mit Hilfe der Traumteilungstechnologie Unternehmensgeheimnisse stiehlt.",
      }
    };
    setMovie(mockData[lang] || mockData["en"]);
  }, [lang]);

  const addComment = () => {
    if (!newComment || !newTime) return;
    setComments([...comments, { id: Date.now(), user: "You", time: newTime, text: newComment }]);
    setNewComment("");
    setNewTime("");
  };

  return (
    <div style={{ maxWidth: "800px", margin: "20px auto", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
        <h1>Film Timestamp Prototype</h1>
        <select value={lang} onChange={(e) => setLang(e.target.value)}>
          <option value="en">English</option>
          <option value="ru">Русский</option>
          <option value="fr">Français</option>
          <option value="de">Deutsch</option>
        </select>
      </div>

      {movie && (
        <div style={{ border: "1px solid #ccc", padding: "15px", marginBottom: "20px" }}>
          <h2>{movie.title}</h2>
          <p>{movie.description}</p>
        </div>
      )}

      <div>
        <h3>Discussion by timecodes</h3>
        {comments.map((c) => (
          <div key={c.id} style={{ borderBottom: "1px solid #eee", padding: "5px 0" }}>
            <strong>{c.user}</strong> — <span>{c.time}</span>
            <p>{c.text}</p>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
        <input
          placeholder="Time (hh:mm:ss)"
          value={newTime}
          onChange={(e) => setNewTime(e.target.value)}
        />
        <input
          placeholder="Your comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button onClick={addComment}>Add</button>
      </div>
    </div>
  );
}
