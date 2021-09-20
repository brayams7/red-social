import React from 'react';
import reactDom from 'react-dom';
import './modals.css'

const ComponentModal = ({children, isOpenModal, closeModal})=>{
    const handleContainerClick = e => e.stopPropagation();

    return reactDom.createPortal(
        <React.Fragment>
            <article className={`modal ${isOpenModal && ("is-open")} `} onClick={closeModal}>
                <div className="modal-container" onClick={handleContainerClick}>
                    <button className="modal-close" onClick={closeModal}>X</button>
                    {children}
                </div>
                
            </article>
        </React.Fragment>,
        document.getElementById('modalPortal')
    )
}

export default ComponentModal;