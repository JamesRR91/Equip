import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditProduct from './EditProduct';


function EditProductModal({id}) {
  const [showModal, setShowModal] = useState(false);

  function handleClick() {
      setShowModal(!showModal)
  }

  return (
        <div>
          <button className='modal-button-review' onClick={handleClick}>Edit Your Product?</button>
          {showModal && (
            <Modal onClose={() => setShowModal(false)}>
              <EditProduct id={id} setShowModal={setShowModal}/>
            </Modal>
          )}
        </div>

  );
}

export default EditProductModal;
