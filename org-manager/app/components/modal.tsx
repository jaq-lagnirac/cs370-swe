import React from 'react';

interface ModalProps {
    modalTitle: string;
    modalBody?: React.ReactNode;
    closeButton?: string,
    saveButton?: string,
    deleteButton?: string,
    areYouSureTitle?: string,
    toggleText: string,
    toggleClass?: string,
    toggleOnClick?: () => void;
    onClickSave?: () => void;
    onClickDelete?: () => void;
    onClickClose?: () => void;
    onClickDismiss?: () => void;
    modalId: string,
  }
  
  const Modal: React.FC<ModalProps> = ({ modalTitle, modalBody, closeButton, saveButton, deleteButton, areYouSureTitle, toggleClass, toggleText, modalId, toggleOnClick, onClickDelete, onClickSave, onClickClose, onClickDismiss}) => {
    const handleDelete = () => {
        
    };

  return (
    <>
    <div className="modal fade" id={modalId} role="dialog" aria-labelledby="basicModal" aria-hidden="true">
    <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
        <div className="modal-header">
            <h4 className="modal-title main-modal-title" id="myModalLabel">{modalTitle}</h4>
            <button type="button" className="close" data-dismiss="modal" onClick={onClickDismiss} aria-label="Close">
                <img src="/xicon.svg" alt="Close"/>
            </button>
        </div>
        <div className="modal-body">
            {modalBody}
        </div>
        <div className="modal-footer">
            {closeButton && <button type="button" className="btn btn-default" data-dismiss="modal" onClick={onClickClose}>{closeButton}</button>}
            {deleteButton && <button className="delete-button" onClick={onClickDelete} data-toggle="modal" data-target="#basicModal">{deleteButton}</button>}
            {saveButton && <button className="large-purple-button" type="submit" onClick={onClickSave}>{saveButton}</button>}
        </div>
        </div>
    </div>
    </div>
    {areYouSureTitle && <>
    <div className="modal fade" id="basicModal" data-bs-backdrop="static" role="dialog" aria-labelledby="basicModal" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title ays-modal-title" id="myModalLabel">{areYouSureTitle}</h4>
                </div>
                <div className="modal-body d-flex justify-content-center">
                    <button className="large-purple-button me-2" data-dismiss="modal">Yes</button>
                    <button className="delete-button ms-2" data-dismiss="modal">No, take me back!</button>
                </div>
            </div>
        </div>
    </div>
    </> }
    <button className={toggleClass} onClick={toggleOnClick} data-toggle="modal" data-target={'#' + modalId}>{toggleText}</button>
    </>
  );
};

export default Modal;