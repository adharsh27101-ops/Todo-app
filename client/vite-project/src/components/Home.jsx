import { useNavigate } from "react-router-dom";
import "../css/Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <h1>My Task</h1>
      <p>Organize your tasks. Stay productive.</p>

      <button onClick={() => navigate("/signin")}>
        Get Started
      </button>
    </div>
  );
}

export default Home;