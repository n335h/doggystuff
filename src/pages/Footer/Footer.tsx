import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__logo">
          {/* <img src={logo} alt="logo" /> */}
        </div>
        <div className="footer__links">
          <div className="footer__links__item">
            <h3>Company</h3>
            <ul>
              <li>About us</li>
              <li>Careers</li>
              <li>Press</li>
              <li>Blog</li>
            </ul>
          </div>
          <div className="footer__links__item">
            <h3>Support</h3>
            <ul>
              <li>Contact us</li>
              <li>FAQ</li>
              <li>Shipping</li>
              <li>Returns</li>
            </ul>
          </div>
          <div className="footer__links__item">
            <h3>Follow us</h3>
            <ul>
              <li>Instagram</li>
              <li>Facebook</li>
              <li>Twitter</li>
              <li>Pinterest</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
