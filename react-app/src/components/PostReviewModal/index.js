import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import PostReview from './PostReview';


function PostReviewModal({id}) {
  const [showModal, setShowModal] = useState(false);

  function handleClick() {
      setShowModal(!showModal)
  }
  return (
        <div>
          <button className='modal-button-review' onClick={handleClick}>Review This Product</button>
          {showModal && (
            <Modal onClose={() => setShowModal(false)}>
              <PostReview id={id} setShowModal={setShowModal}/>
            </Modal>
          )}
        </div>

  );
}

export default PostReviewModal;
