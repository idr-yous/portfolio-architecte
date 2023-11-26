import logo from "../assets/static/logo_light.svg";

export default function Footer() {
  return (
    <footer className="footer-wrapper">
      <img src={logo} className="footer-logo" alt="Kasa Logo" />
      <h3 className="footer-credit">© 2020 Kasa. All rights reserved</h3>
    </footer>
  );
}
