export default function Banner({ image, title }) {
  return (
    <div className="home-banner">
      <div className="title">
        <h1>{title}</h1>
      </div>
      <img src={image} alt="kasa home banner" />
    </div>
  );
}
