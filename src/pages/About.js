import React from 'react';
import VerticalNavbar from '../components/VerticalNavbar';

export default function About() {
  return (
    <div className="container-fluid">
      <div className="row">
        <aside className="col-12 col-md-3 col-lg-2 px-0">
          <VerticalNavbar />
        </aside>

        <main className="col-12 col-md-9 col-lg-10">
          <div className="container py-4">
            <h1>About Booknest</h1>
            <p className="lead text-muted">
              Booknest is an independent online bookstore dedicated to connecting readers with great books from around the world.
              We believe in thoughtful curation, excellent customer service, and supporting authors and publishers of all sizes.
            </p>

            <section className="mt-4">
              <h3>Our mission</h3>
              <p>
                To help readers discover meaningful books and to provide an easy, trustworthy place to buy them. We curate selections across genres,
                support independent authors, and aim to offer fast delivery and excellent post-purchase support.
              </p>
            </section>

            <section className="mt-4">
              <h3>Meet the team</h3>
              <div className="row gy-3">
                <div className="col-md-4">
                  <div className="card p-3 h-100">
                    <h5>Alex Morgan</h5>
                    <p className="mb-0 text-muted">Founder & Curator</p>
                    <p className="small mt-2">Alex loves literature and building communities around books.</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card p-3 h-100">
                    <h5>Samira Khan</h5>
                    <p className="mb-0 text-muted">Head of Operations</p>
                    <p className="small mt-2">Samira ensures orders are fulfilled accurately and on time.</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card p-3 h-100">
                    <h5>Diego Fernandez</h5>
                    <p className="mb-0 text-muted">Customer Success</p>
                    <p className="small mt-2">Diego handles customer inquiries and support.</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mt-4">
              <h3>Why choose us?</h3>
              <ul>
                <li>Curated selections from trusted sources</li>
                <li>Competitive pricing and deals</li>
                <li>Secure checkout and reliable shipping</li>
                <li>Responsive customer support</li>
              </ul>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}