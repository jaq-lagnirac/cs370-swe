'use client';
import React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


/* Functions that return booleans should return false to close the modal (or
    keep it closed) and true to open it (or keep it open).
*/
interface TestModalProps {
    modalTitle?: string;
    modalBody?: React.ReactNode;
    showSave: boolean,
    showDelete: boolean,
    showConfirm: boolean,
    openText?: string,
    closeText?: string,
    saveText?: string,
    deleteText?: string,
    confirmTitle?: string,
    buttonVariant?: string,
    toggleOnClick?: () => void;
    onShow?: () => boolean;
    onSave?: () => boolean;
    onDelete?: () => boolean;
    onClose?: () => boolean;
  }

const NewModal: React.FC<TestModalProps> = ({ modalTitle, modalBody, showSave, showDelete, showConfirm, openText, closeText, saveText, deleteText, confirmTitle, buttonVariant, onShow, onDelete, onSave, onClose}) => {
  const [show, setShow] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleClose = () => setShow(typeof onClose === 'function' ? onClose : false);
  const handleSave = () => setShow(typeof onSave === 'function' ? onSave : false);
  const handleDelete = () => setShow(typeof onDelete === 'function' ? onDelete : false);
  const handleShow = () => setShow(typeof onShow === 'function' ? onShow : true);
  const beginDeleteConfirmation = () => {
    setShowConfirmation(true);
  }
  const handleCloseConfirm = () => setShowConfirmation(false);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        {openText || "Open"}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalBody}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {/* There should always be a close button */ closeText || "Close"}
          </Button>
          {showDelete ? 
            showConfirm ?
            <Button variant="primary" onClick={beginDeleteConfirmation}>
              {deleteText || "Delete"}
            </Button>
            :
            <Button variant="dangerous" onClick={handleDelete}>
              {deleteText || "Delete"}
            </Button>
          : <></>}
          {showSave ? 
            <Button variant={buttonVariant || "primary"} onClick={handleSave}>
              {saveText || "Save"}
            </Button>
          : <></>}
        </Modal.Footer>
      </Modal>
      {showConfirm ? 
            <>
              <Modal show={showConfirmation} onHide={handleCloseConfirm}>
                <Modal.Header closeButton>
                  <Modal.Title>{confirmTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Button variant="secondary" onClick={handleCloseConfirm}>
                    No, take me back!
                  </Button>
                  <Button variant="dangerous" onClick={handleDelete}>
                    Yes
                  </Button>
                </Modal.Body>
              </Modal>
            </>
          :
            <></>
      }
    </>
  );
}

export default NewModal;