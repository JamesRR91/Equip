import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import PostReview from './PostReview';


function PostReviewModal({id}) {
  const [showModal, setShowModal] = useState(false);

  return (

    <>
    <div className='modal-button-submit-container'>
      <button className='modal-button-submit' onClick={() => setShowModal(true)}>Submit New Review</button>
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <PostReview id={id} setShowModal={setShowModal}/>
        </Modal>
      )}
    </>

  );
}

export default PostReviewModal;
