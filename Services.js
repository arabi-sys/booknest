import React from "react";

const services = [
  {
    title: "Web Development",
    description: "Modern, scalable websites tailored to your needs using cutting-edge technologies.",
    icon: "🌐",
  },
  {
    title: "Mobile App Solutions",
    description: "iOS and Android applications designed for exceptional user experience.",
    icon: "📱",
  },
  {
    title: "UI/UX Design",
    description: "Intuitive interfaces and engaging experiences to delight your users.",
    icon: "🎨",
  },
];

export default function Services() {
  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center">Our Services</h2>
      <div className="row">
        {services.map((service, idx) => (
          <div key={idx} className="col-md-4 mb-4">
            <div className="card h-100 text-center border-0 shadow-sm">
              <div className="card-body">
                <span style={{fontSize: "2.5rem"}}>{service.icon}</span>
                <h5 className="card-title mt-3">{service.title}</h5>
                <p className="card-text">{service.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}