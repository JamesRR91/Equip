import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import GetCart from './GetCart';


function GetCartModal() {
  const [showModal, setShowModal] = useState(false);

  function handleClick() {
      setShowModal(!showModal)
  }

  return (
        <div>
          <button className='modal-button' onClick={handleClick}>My Cart
          <i class="fas fa-shopping-cart fa-fw"></i>
          </button>
          {showModal && (
            <Modal onClose={() => setShowModal(false)}>
              <GetCart setShowModal={setShowModal}/>
            </Modal>
          )}
        </div>

  );
}

export default GetCartModal;