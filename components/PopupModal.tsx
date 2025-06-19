import { X } from 'lucide-react';
import React, { ReactNode, useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';

interface PopupModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const PopupModal: React.FC<PopupModalProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  if (!isOpen && !isVisible) return null;

  return ReactDOM.createPortal(
    <div
      className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-opacity duration-200 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className={`bg-white rounded-lg shadow-lg p-6 relative w-full max-w-lg mx-6 min-h-[300px] transition-all duration-200 transform ${
          isVisible ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 cursor-pointer"
          onClick={onClose}
        >
          <X />
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default PopupModal;
