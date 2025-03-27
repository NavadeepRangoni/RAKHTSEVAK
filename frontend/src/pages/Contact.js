import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-lg border-0">
            <div className="card-body p-5">
              <h1 className="text-center text-danger mb-5">Contact Us</h1>
              
              <div className="row g-4 mb-5">
                <div className="col-md-4 text-center">
                  <i className="fas fa-map-marker-alt fa-2x text-danger mb-3"></i>
                  <h5>Address</h5>
                  <p>123 Blood Bank Street, City</p>
                </div>
                <div className="col-md-4 text-center">
                  <i className="fas fa-phone fa-2x text-danger mb-3"></i>
                  <h5>Phone</h5>
                  <p>+1 234 567 890</p>
                </div>
                <div className="col-md-4 text-center">
                  <i className="fas fa-envelope fa-2x text-danger mb-3"></i>
                  <h5>Email</h5>
                  <p>contact@lifedrop.com</p>
                </div>
              </div>
              
              <form>
                <div className="row g-3">
                  <div className="col-md-6">
                    <input type="text" className="form-control" placeholder="Your Name" required />
                  </div>
                  <div className="col-md-6">
                    <input type="email" className="form-control" placeholder="Your Email" required />
                  </div>
                  <div className="col-12">
                    <input type="text" className="form-control" placeholder="Subject" />
                  </div>
                  <div className="col-12">
                    <textarea className="form-control" rows="5" placeholder="Your Message" required></textarea>
                  </div>
                  <div className="col-12 text-center">
                    <button type="submit" className="btn btn-danger px-4 py-2 transition-btn">
                      Send Message
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;