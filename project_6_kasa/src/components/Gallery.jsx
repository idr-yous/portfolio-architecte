import data from "../data/data.json";
import Card from "./Card";

export default function Gallery() {
  return (
    <div className="home-gallery">
      <div className="gallery_feed">
        {data.map((item) => (
          <Card
            key={item.id}
            id={item.id}
            cover={item.cover}
            title={item.title}
          />
        ))}
      </div>
    </div>
  );
}
