import Banner from "../../components/Banner";
import Gallery from "../../components/Gallery";
import bannerImg from "../../assets/static/home-banner.webp";

export default function Home() {
  return (
    <div className="container">
      <Banner title="Chez vous, partout et ailleurs" image={bannerImg} />
      <Gallery />
    </div>
  );
}
