import React from "react";
import "../styles/ConfirmationModal.css";

interface ConfirmationModalProps {
  isOpen: boolean;
  isClosing: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  variant?: "primary" | "danger";
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  isClosing,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  variant = "primary",
}) => {
  if (!isOpen) return null;

  return (
    <div className={`confirmation-modal-overlay ${isClosing ? "closing" : ""}`}>
      <div className={`confirmation-modal ${variant}`}>
        <div className="confirmation-modal-header">
          <h2 className="confirmation-modal-title">{title}</h2>
          <button
            className="confirmation-modal-close"
            onClick={onCancel}
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        <div className="confirmation-modal-body">
          <p className="confirmation-modal-message">{message}</p>
        </div>

        <div className="confirmation-modal-footer">
          <button
            className="confirmation-modal-btn cancel"
            onClick={onCancel}
          >
            {cancelText}
          </button>
          <button
            className={`confirmation-modal-btn confirm ${variant}`}
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
