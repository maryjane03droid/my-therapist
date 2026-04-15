import { Link } from "react-router-dom";

const emergencyContacts = [
  {
    title: "Police / Emergency",
    number: "999 / 112 / 911",
    note: "Use immediately if you or someone else is in immediate danger.",
    type: "emergency",
  },
  {
    title: "Kenya Red Cross Support",
    number: "1199",
    note: "Toll-free support line for urgent emotional and mental health support.",
    type: "crisis",
  },
];

const officialContacts = [
  {
    name: "Counsellors and Psychologist Board",
    role: "Regulator / verification point",
    phone: "+254-20-717077",
    note: "Government regulator for counsellors and psychologists.",
  },
  {
    name: "Kenya Psychiatrist Association",
    role: "Professional association",
    phone: "+254796161087",
    note: "Professional body with a psychiatrist directory and contact support.",
  },
  {
    name: "Kenya Psychological Association",
    role: "Professional association",
    phone: "+254 714 211 202",
    note: "Association representing psychologists in Kenya.",
  },
];

const psychiatristContacts = [
  {
    name: "Dr. David Kagwi Wairoto",
    role: "Consultant Psychiatrist",
    phone: "+254745113866",
    location: "Chiromo Lane Doctors Plaza, Muthangari Road, Nairobi",
  },
  {
    name: "Dr. Catherine Munanie Syengo Mutisya",
    role: "Consultant Psychiatrist",
    phone: "0202365638",
    location: "KMA Centre, Mara Road, Upper Hill, Nairobi",
  },
  {
    name: "Dr. Pauline Ng'ang'a",
    role: "Consultant Psychiatrist",
    phone: "0115876000",
    location: "Chiromo Hospital Group, Muthangari Road, Nairobi",
  },
  {
    name: "Dr. Susan Hinga",
    role: "Psychiatrist",
    phone: "+254711328181",
    location: "Mater Hospital, Nairobi",
  },
];

export default function SupportGroup() {
  return (
    <section className="support-screen">
      <div className="support-hero">
        <div className="support-hero-left">
          <span className="support-badge">Support & Safety</span>
          <h1>Find support when things feel too heavy</h1>
          <p>
            This page brings together emergency help, mental health support lines,
            and professional contacts so you can quickly find the right kind of help.
          </p>

          <div className="support-hero-actions">
            <Link to="/chat" className="support-primary-btn">
              Talk to AI Support
            </Link>
            <Link to="/journal" className="support-secondary-btn">
              Write in Journal
            </Link>
          </div>
        </div>

        <div className="support-hero-art">
          <div className="support-illustration-card">
            <div className="support-bubble bubble-a">Reach out early</div>
            <div className="support-bubble bubble-b">Help is available</div>
            <div className="support-avatar">🤝</div>
          </div>
        </div>
      </div>

      <div className="support-alert-strip">
        <div className="support-alert-icon">⚠️</div>
        <div>
          <strong>If there is immediate danger or a life-threatening emergency:</strong>{" "}
          call <span className="support-inline-number">999</span>,{" "}
          <span className="support-inline-number">112</span>, or{" "}
          <span className="support-inline-number">911</span> right away.
        </div>
      </div>

      <div className="support-emergency-grid">
        {emergencyContacts.map((item) => (
          <div key={item.title} className={`support-emergency-card ${item.type}`}>
            <div className="support-emergency-top">
              <h3>{item.title}</h3>
              <span className="support-big-number">{item.number}</span>
            </div>
            <p>{item.note}</p>
          </div>
        ))}
      </div>

      <div className="support-layout">
        <div className="support-main-column">
          <div className="support-section-card">
            <div className="section-heading">
              <h2>Official contacts</h2>
              <p>
                These contacts help with professional guidance, referrals, and
                verification of mental health practitioners.
              </p>
            </div>

            <div className="support-card-list">
              {officialContacts.map((item) => (
                <div key={item.name} className="support-contact-card">
                  <div className="support-contact-main">
                    <h3>{item.name}</h3>
                    <span className="support-contact-role">{item.role}</span>
                    <p>{item.note}</p>
                  </div>
                  <div className="support-contact-phone">{item.phone}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="support-section-card">
            <div className="section-heading">
              <h2>Association-listed psychiatrist contacts</h2>
              <p>
                These are examples of psychiatrists listed in the Kenya Psychiatrist
                Association directory.
              </p>
            </div>

            <div className="support-card-list">
              {psychiatristContacts.map((item) => (
                <div key={item.name} className="support-contact-card therapist-card">
                  <div className="support-contact-main">
                    <h3>{item.name}</h3>
                    <span className="support-contact-role">{item.role}</span>
                    <p>{item.location}</p>
                  </div>
                  <div className="support-contact-phone">{item.phone}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="support-side-column">
          <div className="support-side-card">
            <h3>When to call emergency help</h3>
            <ul className="support-list">
              <li>If someone is in immediate danger</li>
              <li>If there is self-harm risk or violence</li>
              <li>If urgent physical safety is involved</li>
            </ul>
          </div>

          <div className="support-side-card">
            <h3>When to call mental health support</h3>
            <ul className="support-list">
              <li>If you feel emotionally overwhelmed</li>
              <li>If you need someone to talk to urgently</li>
              <li>If you feel unsafe being alone with your thoughts</li>
            </ul>
          </div>

          <div className="support-side-card">
            <h3>Important note</h3>
            <p>
              Contact numbers and clinic availability can change. For professional
              care, use the official bodies above to verify or get the most current
              referral details.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}