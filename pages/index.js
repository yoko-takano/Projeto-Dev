import { useRef, useState } from "react";
import Snowfall from "react-snowfall";

const text = "Working in Progress...";

export default function Home() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  function togglePlay() {
    const audio = audioRef.current;
    if (playing) {
      audio.pause();
    } else {
      audio.play();
    }
    setPlaying(!playing);
  }

  return (
    <div style={styles.container}>
      <audio ref={audioRef} src="/harvest_moon_spring.mp3" loop />
      <Snowfall
        snowflakeCount={150}
        color="white"
        style={{ zIndex: 10, position: "fixed" }}
      />
      <div style={styles.textWrapper}>
        <div style={styles.lettersRow}>
          {text.split("").map((char, i) => (
            <span
              key={i}
              className="wave-letter"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </div>
        <div style={styles.buttonRow}>
          <button
            onClick={togglePlay}
            style={{ ...styles.button, paddingLeft: playing ? "0" : "4px" }}
          >
            {playing ? "⏸" : "▶"}
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    backgroundImage: "url('/background.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  textWrapper: {
    zIndex: 20,
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "rgba(255, 220, 200, 0.18)",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
    borderRadius: "24px",
    border: "1px solid rgba(255, 200, 180, 0.3)",
    padding: "2rem 3rem",
    gap: "1.5rem",
  },
  lettersRow: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  buttonRow: {
    display: "flex",
    justifyContent: "center",
  },
  button: {
    background: "rgba(255, 220, 200, 0.35)",
    border: "1px solid rgba(255, 200, 180, 0.5)",
    borderRadius: "50%",
    width: "52px",
    height: "52px",
    fontSize: "1.4rem",
    cursor: "pointer",
    backdropFilter: "blur(4px)",
    WebkitBackdropFilter: "blur(4px)",
    color: "#b5607a",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background 0.2s",
  },
};
