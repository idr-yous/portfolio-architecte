import "./About.scss";

import Banner from "../../components/Banner";
import Collapse from "../../components/Collapse";
import aboutData from "../../data/aboutData.json";
import bannerImg from "../../assets/static/about-banner.webp";

export default function About() {
  return (
    <div className="container">
      <Banner image={bannerImg} />
      <div className="about-wrapper">
        {aboutData.map((item, index) => (
          <Collapse key={index} title={item.title} content={item.content} />
        ))}
      </div>
    </div>
  );
}
