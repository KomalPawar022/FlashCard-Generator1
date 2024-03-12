import "./modal.css";
import { Link } from "react-router-dom";
export default function Modal({ id, header, body, footer, onClose }) {
  return (
    <div id={id || "Modal"} className="modal">
      <div className="content">
        <div className="header"></div>
        <nav>
          <span onClick={onClose} className="close-modal-icon">
            <Link to="/my-flashcards">✖</Link>
          </span>
        </nav>
        <h2>{header ? header : "Header"}</h2>
        <div className="body">
          {body ? (
            body
          ) : (
            <div>
              <p>This is the Modal Body</p>
            </div>
          )}
        </div>
        <div className="footer">{footer ? footer : <h2>Footer</h2>}</div>
      </div>
    </div>
  );
}
