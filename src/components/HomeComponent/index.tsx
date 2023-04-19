import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from './HomeComponent.module.scss'

const HomeComponent = () => {
  const [authToken, setAuthToken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('auth');
    setAuthToken(token);
  }, []);

  return (
    <div className={styles.home}>
      <h1>Seja Bem-vindo</h1>
      <p>{authToken 
          ? <span>Você pode enviar seu csv nesta <Link to="/send-balance">página</Link>.</span>
          : <span>Faça <Link to="/login">login</Link> para enviar seu csv.</span>
        }
      </p>
    </div>
  );
};

export default HomeComponent;