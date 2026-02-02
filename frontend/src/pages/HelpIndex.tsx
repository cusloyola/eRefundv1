import "../styles/Help.css";
import NavBar from "../components/NavBar";

const HelpIndex: React.FC = () => {
  return (
    <div className="help-root">
      <NavBar />
      <main className="help-content">
        <h1 className="help-title">Help Index</h1>
        <p className="help-subtitle">Quick lookup of common keywords.</p>

        <div className="help-grid">
          <div className="help-card">
            <h3>Search</h3>
            <p>Search by Control No., Payee, or document numbers.</p>
          </div>
          <div className="help-card">
            <h3>Date Filters</h3>
            <p>Use From/To to limit results to a specific period.</p>
          </div>
          <div className="help-card">
            <h3>Pagination</h3>
            <p>Use Previous/Next or page numbers to navigate results.</p>
          </div>
          <div className="help-card">
            <h3>Export/Generate</h3>
            <p>Generate buttons are placeholders for report output.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HelpIndex;