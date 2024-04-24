'use client';
import React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


/* Functions that return booleans should return false to close the modal (or
    keep it closed) and true to open it (or keep it open).
    onClose runs when the close button is pressed, onHide when it is closed some
    other way. Probably, they will usually do the same thing. By default, they
    both simply setShow(false).
*/
interface ControlledModalProps {
    modalTitle?: string;
    modalBody?: React.ReactNode;
    showSave: boolean,
    showDelete: boolean,
    showConfirm: boolean,
    showClose: boolean,
    openText?: string,
    closeText?: string,
    saveText?: string,
    deleteText?: string,
    confirmTitle?: string,
    buttonVariant?: string,
    onShow?: () => boolean,
    onSave?: () => boolean,
    onDelete?: () => boolean,
    onClose?: () => boolean,
    onHide?: () => boolean,
    show: boolean,
    setShow: React.Dispatch<React.SetStateAction<boolean>>,
  }

const ControlledModal: React.FC<ControlledModalProps> = ({ modalTitle, modalBody, showSave, showDelete, showConfirm, showClose, openText, closeText, saveText, deleteText, confirmTitle, buttonVariant, onShow, onDelete, onSave, onClose, onHide, show, setShow}) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleShow = () => setShow(typeof onShow === 'function' ? onShow : true);
  const beginDeleteConfirmation = () => {
    setShowConfirmation(true);
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        {openText || "Open"}
      </Button>

      <Modal show={show} onHide={() => {setShow(onHide ? onHide() : false)}}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalBody}</Modal.Body>
        <Modal.Footer>
          {showClose ?
            <Button variant="secondary" onClick={() => {setShow(onClose ? onClose() : false)}}>
              {closeText || "Close"}
            </Button>
          : <></>
          }
          {showDelete ? 
            showConfirm ?
            <Button variant="primary" onClick={beginDeleteConfirmation}>
              {deleteText || "Delete"}
            </Button>
            :
            <Button variant="dangerous" onClick={() => {setShow(onDelete ? onDelete() : false)}}>
              {deleteText || "Delete"}
            </Button>
          : <></>}
          {showSave ? 
            <Button variant={buttonVariant || "primary"} onClick={() => {setShow(onSave ? onSave() : false)}}>
              {saveText || "Save"}
            </Button>
          : <></>}
        </Modal.Footer>
      </Modal>
      {showConfirm ? 
            <>
              <Modal show={showConfirmation} onHide={() => {setShowConfirmation(false)}}>
                <Modal.Header closeButton>
                  <Modal.Title>{confirmTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Button variant="secondary" onClick={() => {setShowConfirmation(false)}}>
                    No, take me back!
                  </Button>
                  <Button variant="dangerous" onClick={() => {setShow(onDelete ? onDelete() : false)}}>
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

export default ControlledModal;