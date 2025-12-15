import React, { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import {
  FaPaperPlane,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt
} from 'react-icons/fa';
import './Contact.css';

// ==== EmailJS IDs ====
const serviceID = "service_46yfrpi";
const templateID = "template_0yzjqgb";
const userID = "_7B-O_2Cr_iI7TA3s";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await emailjs.send(
        serviceID,
        templateID,
        {
          name: formData.name,
          email: formData.email,
          message: formData.message
        },
        userID
      );

      alert("✅ Thanks! Your message has been sent 🚀");
      setFormData({ name: '', email: '', message: '' });

    } catch (error) {
      console.error("EmailJS Error:", error);
      alert("❌ Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">

        {/* HEADER */}
        <div className="contact-header">
          <motion.h2
            className="contact-heading"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Contact <span>me</span>
          </motion.h2>

          <motion.p
            className="contact-subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Want to collaborate on web or AI/ML projects or have opportunities?
            Drop a message or reach out directly.
          </motion.p>
        </div>

        <div className="contact-content">

          {/* CONTACT INFO */}
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="contact-item">
              <div className="contact-icon-wrapper">
                <FaEnvelope className="contact-icon" />
              </div>
              <div>
                <h3>Email</h3>
                <a
                  href="mailto:mpraharshitha2006@gmail.com"
                  className="contact-link"
                >
                  mpraharshitha2006@gmail.com
                </a>
              </div>
            </div>

            

            <div className="contact-item">
              <div className="contact-icon-wrapper">
                <FaMapMarkerAlt className="contact-icon" />
              </div>
              <div>
                <h3>Location</h3>
                <span className="contact-location">
                  Kakinada, Andhra Pradesh
                </span>
              </div>
            </div>
          </motion.div>

          {/* FORM */}
          <motion.form
            className="contact-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="form-group">
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder=" "
                className="form-input"
              />
              <label className="form-label">Your Name</label>
            </div>

            <div className="form-group">
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder=" "
                className="form-input"
              />
              <label className="form-label">Email Address</label>
            </div>

            <div className="form-group">
              <textarea
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                required
                placeholder=" "
                className="form-textarea"
              />
              <label className="form-label">Your Message</label>
            </div>

            <motion.button
              type="submit"
              className="submit-btn"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaPaperPlane className={isSubmitting ? "spin" : ""} />
              <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
            </motion.button>
          </motion.form>

        </div>
      </div>
    </section>
  );
}
