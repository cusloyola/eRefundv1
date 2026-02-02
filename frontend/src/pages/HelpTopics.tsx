import "../styles/Help.css";
import NavBar from "../components/NavBar";

const HelpTopics: React.FC = () => {
  return (
    <div className="help-root">
      <NavBar />
      <main className="help-content">
        <h1 className="help-title">Help Topics</h1>
        <p className="help-subtitle">Browse common tasks and troubleshooting.</p>

        <section className="help-card">
          <h2>Getting Started</h2>
          <ul>
            <li>Log in using your assigned credentials.</li>
            <li>Navigate via the top menu for Operations, Inquiry, and Reports.</li>
            <li>Use the Search and Date filters to refine results.</li>
          </ul>
        </section>

        <section className="help-card">
          <h2>Reports</h2>
          <ul>
            <li>Processed Refund: view completed refunds.</li>
            <li>Container Charges: review charges and deductions.</li>
            <li>Summary of Container Detention: view detention summaries.</li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default HelpTopics;