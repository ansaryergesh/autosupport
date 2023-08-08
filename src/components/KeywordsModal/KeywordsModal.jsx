import React, {useState} from 'react';
import { Modal } from 'antd';
import Input from '../Input/Input';
import PropTypes from "prop-types";
import {addKeyword} from "../../service/Keywords/index.js";

const KeywordsModal = ({
   editPage,
   isModalOpen=false,
   handleModal = () => {}
  }) => {

  const [text,setText] = useState("");

  const handleSubmit = () => {
      addKeyword({text})
          .then(res => {
              console.log(res)
          })
  }
  return (
    <>
        {editPage}
      <Modal
        title="Edit keyword"
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={handleModal}
        okButtonProps={{ className: 'button-primary' }}
        cancelButtonProps={{ className: 'button-default' }}>
        <Input
            value={text}
            onChange={(e)=> setText(e.target.value)}
        />
      </Modal>
    </>
  );
};

KeywordsModal.propTypes = {
    editPage: PropTypes.bool,
    isModalOpen: PropTypes.bool,
    handleSubmit: PropTypes.func,
    handleModal: PropTypes.func,
}

export default KeywordsModal;
