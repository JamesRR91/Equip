import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import DeleteReview from './DeleteReview';


function DeleteReviewModal({id}) {
  const [showModal, setShowModal] = useState(false);

  function handleClick() {
      setShowModal(!showModal)
  }

  return (
        <div>
          <button className='modal-button-review' onClick={handleClick}><i className='fas fa-eraser'></i></button>
          {showModal && (
            <Modal onClose={() => setShowModal(false)}>
              <DeleteReview id={id} setShowModal={setShowModal}/>
            </Modal>
          )}
        </div>

  );
}

export default DeleteReviewModal;
