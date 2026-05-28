import "../styles/footer.css";

export default function Footer() {

  return (

    <footer className="footer">

      <div className="footer-container">

        {/* LEFT */}

        <div className="footer-left">

          <h3>
            ResolveHub CRM
          </h3>

          <p>
            Smart customer support and ticket
            management platform designed for
            modern businesses.
          </p>

        </div>

        {/* CENTER */}

        <div className="footer-links">

          <a href="/">
            Home
          </a>

          <a href="/track-ticket">
            Track Ticket
          </a>

          <a href="/admin/login">
            Admin Login
          </a>

        </div>

        {/* RIGHT */}

        <div className="footer-right">

          <p>
            Support Available 24/7
          </p>

          <span>
            © 2026 ResolveHub CRM
          </span>

        </div>

      </div>

    </footer>
  );
}