import { useNavigate } from "react-router-dom";

export default function Card({ id, cover, title }) {
  const navigate = useNavigate();

  return (
    <article className="card" onClick={() => navigate(`/housing/${id}`)}>
      <div className="card_image">
        <img src={cover} alt={`image de l'annonce - ${title}`} />
      </div>
      <div className="card_title">
        <h3>{title}</h3>
      </div>
    </article>
  );
}
