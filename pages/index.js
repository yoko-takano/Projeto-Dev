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
    gap: "1.8rem",
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
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "white",
    fontSize: "1.4rem",
    filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.5))",
    padding: "0",
  },
};
