import "./Housing.scss";

import { useParams, redirect } from "react-router-dom";
import Error from "../error/Error";
import Carousel from "../../components/Carousel";
import Rating from "../../components/Rating";
import Collapse from "../../components/Collapse";
import data from "../../data/data.json";

export default function Housing() {
  const { id } = useParams();
  // const navigate = useNavigate();

  // get target ad data
  const targetAd = data.find((ad) => ad.id === id);

  // check if no id found we return 404 error
  if (!targetAd) {
    return <Error />;
  }

  // set page title
  document.title = "Kasa - " + targetAd.title;

  ///
  const [firstName, lastName] = targetAd.host.name.split(" ");

  return (
    <div className="container">
      <Carousel images={targetAd.pictures} />
      <div className="housing-infos">
        <div className="infos-box">
          <h1 className="title">{targetAd.title}</h1>
          <p className="location">{targetAd.location}</p>
          <div className="tag-wrapper">
            {targetAd.tags.map((tag, index) => (
              <div key={index} className="tag">
                {tag}
              </div>
            ))}
          </div>
        </div>
        <div className="rating-box">
          <Rating rating={targetAd.rating} />
          <div className="host-wrapper">
            <div className="host-name">
              {firstName}
              <br />
              {lastName}
            </div>
            <img
              className="host-picture"
              src={targetAd.host.picture}
              alt="Host"
            />
          </div>
        </div>
      </div>
      <div className="housing-collaps">
        <Collapse title="Description" content={targetAd.description} />
        <Collapse title="Équipements" content={targetAd.equipments} />
      </div>
    </div>
  );
}
