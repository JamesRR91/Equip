import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import GetCart from './GetCart';


function GetCartModal({cartItem}) {
  const [showModal, setShowModal] = useState(false);

  function handleClick() {
      setShowModal(!showModal)
  }

  return (
        <div>
          <button className='modal-button-review' onClick={handleClick}>Add To Cart</button>
          {showModal && (
            <Modal onClose={() => setShowModal(false)}>
              <GetCart cartItem={cartItem} setShowModal={setShowModal}/>
            </Modal>
          )}
        </div>

  );
}

export default GetCartModal;