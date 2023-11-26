import { Link } from "react-router-dom";
import "./Error.scss";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function Error() {
  return (
    <>
      <Header />
      <main className="main-content">
        <div className="container">
          <div className="error">
            <h1 className="error_title">404</h1>
            <h2 className="error_subtitle">
              Oups! La page que vous demandez n'existe pas.
            </h2>
            <Link className="error_link" to="/">
              Retourner sur la page d'accueil
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
