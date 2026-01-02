import { useNavigate } from "react-router-dom";
import styles from "./NotFound.module.scss";

const NotFound = () => {
  const nav = useNavigate();

  return (
    <section className={styles.notFound}>
      <div className="container">
        <div className={styles.box}>
          <h1>404</h1>
          <h2>Page Not Found</h2>
          <p>Sorry, the page you are looking for does not exist.</p>

          <button onClick={() => nav("/")}>
            Go Back
          </button>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
