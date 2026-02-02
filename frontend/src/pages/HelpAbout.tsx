import "../styles/Help.css";
import NavBar from "../components/NavBar";

const HelpAbout: React.FC = () => {
  return (
    <div className="help-root">
      <NavBar />
      <main className="help-content">
        <h1 className="help-title">About</h1>
        <p className="help-subtitle">eRefund Modern UI (static help)</p>

        <section className="help-card">
          <h2>Application</h2>
          <p>
            This is a modernized interface for the legacy eRefund workflow. The
            Help section is now web-based and no longer uses deprecated desktop
            help viewers.
          </p>
        </section>

        <section className="help-card">
          <h2>Version</h2>
          <p>Build: 2026.02.02</p>
        </section>
      </main>
    </div>
  );
};

export default HelpAbout;