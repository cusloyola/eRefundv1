import { useEffect, useRef } from "react";
import "../styles/LogoutModal.css";

interface LogoutModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({ isOpen, onConfirm, onCancel }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onCancel();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div className="logout-modal-backdrop">
      <div className="logout-modal" ref={modalRef}>
        <h2>Confirm Logout</h2>
        <p>Are you sure you want to log out?</p>
        <div className="logout-modal-actions">
          <button onClick={onCancel} className="logout-modal-cancel">
            Cancel
          </button>
          <button onClick={onConfirm} className="logout-modal-confirm">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
