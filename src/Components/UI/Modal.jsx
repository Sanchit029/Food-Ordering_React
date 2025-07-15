import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
export default function Modal({ children, open, className = "" , onClose }) {
  const dia = useRef();

  useEffect(() => {
    const modal = dia.current;
    if (open) {
      modal.showModal();
    }
    else
    {
      modal.close()
    }
  }, [open]);
  return createPortal(
    <dialog ref={dia} className={`modal ${className}`} onClose={onClose}>
      {children}
    </dialog>,
    document.getElementById("modal")
  );
}
