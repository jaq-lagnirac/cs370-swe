/* IF YOU ARE USING THIS COMPONENT, YOU MUST ADD THE FOLLOWING CSS TO
WHATEVER YOU WANT TO TOGGLE THE MODAL:
data-toggle="modal" data-target="#largeModal"

see page.tsx under layout.tsx for example
*/

import React from 'react';

interface ModalProps {
    modalTitle: string;
    modalBody?: React.ReactNode;
    closeButton?: boolean,
    saveButton?: boolean,
    deleteButton?: boolean,
    areYouSureTitle?: string,
    toggleText: string,
    toggleClass?: string,
    toggleStyle?: string,
    modalId: string,
  }
  
  const Modal: React.FC<ModalProps> = ({ modalTitle, modalBody, closeButton, saveButton, deleteButton, areYouSureTitle, toggleText, toggleClass, modalId }) => {
    const handleDelete = () => {
        
    };

  return (
    <>
    <div className="modal fade" id={modalId} role="dialog" aria-labelledby="basicModal" aria-hidden="true">
    <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
        <div className="modal-header">
            <h4 className="modal-title main-modal-title" id="myModalLabel">{modalTitle}</h4>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <img src="/xicon.svg" alt="Close"/>
            </button>
        </div>
        <div className="modal-body">
            {modalBody}
        </div>
        <div className="modal-footer">
            {closeButton && <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>}
            {saveButton && <button className="large-purple-button">Save</button>}
            {deleteButton && <button className="delete-button" onClick={handleDelete} data-toggle="modal" data-target="#basicModal">Delete</button>}
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
    <button className={toggleClass} data-toggle="modal" data-target={'#' + modalId} style={{float: 'right'}}>{toggleText}</button>
    </> }
    </>
  );
};

export default Modal;