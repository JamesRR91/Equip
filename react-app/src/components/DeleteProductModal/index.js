import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import DeleteProduct from './DeleteProduct';


function DeleteProductModal({id}) {
  const [showModal, setShowModal] = useState(false);

  function handleClick() {
      setShowModal(!showModal)
  }

  return (
        <div>
          <button className='modal-button-review' onClick={handleClick}>Delete Your Product?</button>
          {showModal && (
            <Modal onClose={() => setShowModal(false)}>
              <DeleteProduct id={id} setShowModal={setShowModal}/>
            </Modal>
          )}
        </div>

  );
}

export default DeleteProductModal;
