import React from 'react';
import { useState } from 'react';
import styles from './index.module.less';
import Input from 'components/Input/Input.jsx';
import { PlusCircleFilled } from '@ant-design/icons';

const NewLabels = ({ num }) => {
  const [inputValues, setInputValues] = useState([]);

  const handleAddInput = () => {
    setInputValues(prevState => [...prevState, {value: '', edit: false, id: '1'}]);
  };

  const handleInputChange = (index, value) => {
    const updatedInputs = [...inputValues];
    updatedInputs[index] = value;
    setInputValues(updatedInputs);
  };

  return (
    <div className={styles.inputBox}>
      <div className={styles.number}>{num}</div>
      {inputValues.map((item, index) => {
        return (
            <Input
                key={index}
                readOnly
                value={item.value}
                maxLength={50}
                onChange={(e) => handleInputChange(index, e.target.value)}
                type="text"
                className={styles.inputItem}
                placeholder="Введите метку"
            />
        )
      })}
        {inputValues.length > 4 ? null : (
          <PlusCircleFilled className={styles.icon} onClick={handleAddInput} />
        )}
    </div>
  );
};

export default NewLabels;
