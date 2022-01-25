import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditReview from './EditReview'


function EditReviewModal({id}) {
  const [showModal, setShowModal] = useState(false);

  function handleClick() {
      setShowModal(!showModal)
  }

  return (
        <div>
          <button className='modal-button-review' onClick={handleClick}>Edit Your Review?</button>
          {showModal && (
            <Modal onClose={() => setShowModal(false)}>
              <EditReview id={id} setShowModal={setShowModal}/>
            </Modal>
          )}
        </div>

  );
}

export default EditReviewModal;
