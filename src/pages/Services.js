import React from 'react';
import VerticalNavbar from '../components/VerticalNavbar';
import { FaTruck, FaGift, FaExchangeAlt, FaHeadset } from 'react-icons/fa';

export default function Services() {
  const services = [
    { icon: <FaTruck size={24} />, title: 'Fast Shipping', desc: 'Multiple shipping options and tracking available to get your books to you fast.' },
    { icon: <FaGift size={24} />, title: 'Gift Wrapping', desc: 'Add gift wrap and a personal message at checkout for any order.' },
    { icon: <FaExchangeAlt size={24} />, title: 'Easy Returns', desc: 'Returns within 30 days for most items. See our returns policy for details.' },
    { icon: <FaHeadset size={24} />, title: 'Customer Support', desc: 'Email and live chat support can help with any order questions.' },
  ];

  return (
    <div className="container-fluid">
      <div className="row">
        <aside className="col-12 col-md-3 col-lg-2 px-0">
          <VerticalNavbar />
        </aside>

        <main className="col-12 col-md-9 col-lg-10">
          <div className="container py-4">
            <h1>Our Services</h1>
            <p className="text-muted">We offer a variety of services to make your experience better.</p>

            <div className="row gy-4 mt-3">
              {services.map(s => (
                <div className="col-md-6" key={s.title}>
                  <div className="d-flex gap-3 align-items-start">
                    <div className="text-primary">{s.icon}</div>
                    <div>
                      <h5>{s.title}</h5>
                      <p className="text-muted mb-0">{s.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <section className="mt-5">
              <h4>Special Services</h4>
              <div className="row gy-3">
                <div className="col-md-6">
                  <div className="card p-3">
                    <h5>Bulk Orders & Corporate Sales</h5>
                    <p className="mb-0">We handle bulk orders for schools, libraries, and businesses. Contact us for a custom quote.</p>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="card p-3">
                    <h5>Curated Book Clubs</h5>
                    <p className="mb-0">Get monthly curated selections for book clubs, with special pricing and discussion guides available.</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}