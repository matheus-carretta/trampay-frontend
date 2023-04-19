import { Link } from "react-router-dom";
import Header from "../components/Header";
import { useState, useEffect } from "react";

const Home = () => {
  const [authToken, setAuthToken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('auth');
    setAuthToken(token);
  }, []);

  return (
    <>
      <Header />
      <p>{authToken 
          ? <span>Você pode enviar seu csv nesta <Link to="/send-balance">página</Link>.</span>
          : <span>Faça <Link to="/login">login</Link> para enviar seu csv.</span>
        }
      </p>
    </>
  );
};

export default Home;
