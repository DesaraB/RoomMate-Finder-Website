import { useState, useEffect } from "react";
import "./contact.css";
import { useAuthContext } from "../../Context/AuthContext";

const Contact = () => {
  const { sara } = useAuthContext();
//  const [message, setMessage] = useState(null);

//  useEffect(() => {
//    getSara();
//  }, []);

//  const getSara = async () => {
//    const result = await sara();
//    if (result.data.status === 200) {
//		setMessage(result.data.user)
//	}
//  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Message sent! We'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };
  return (
    <div className="contact-container">
      <div className="contact-header">
        <h1>Contact Us </h1>
        <p>Have questions? We'd love to hear from you.</p>
      </div>

      <div className="contact-content">
        <div className="contact-form">
          <h2>Send us a message</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                required
              />
            </div>

            <div className="form-group">
              <label>Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="What is this regarding?"
                required
              />
            </div>

            <div className="form-group">
              <label>Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message..."
                rows="5"
                required
              ></textarea>
            </div>

            <button type="submit" className="submit-btn">
              Send Message
            </button>
          </form>
        </div>

        <div className="contact-info">
          <h2>Contact Information</h2>

          <div className="info-item">
            <h3>📍 Our Office</h3>
            <p>
              123 Roommate Street,
              <br />
              Tirane,
              <br />
              AL
            </p>
          </div>

          <div className="info-item">
            <h3>✉️ Email Us</h3>
            <p>
              <a href="mailto:hello@roommatefinder.com">
                hello@roommatefinder.com
              </a>
              <br />
              <a href="mailto:support@roommatefinder.com">
                support@roommatefinder.com
              </a>
            </p>
          </div>

          <div className="info-item">
            <h3>📞 Call Us</h3>
            <p>
              <a href="tel:+11234567890">+1 (123) 456-7890</a>
              <br />
              Monday-Friday: 9am - 6pm PST
            </p>
          </div>

          <div className="info-item">
            <h3>🕒 Business Hours</h3>
            <p>
              Monday-Friday: 8am - 8pm PST
              <br />
              Saturday: 10am - 6pm PST
              <br />
              Sunday: 12pm - 5pm PST
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
