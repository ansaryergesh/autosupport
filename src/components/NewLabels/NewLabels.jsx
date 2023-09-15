import React, { useEffect, useState } from 'react';
import styles from './index.module.less';
import Input from 'components/Input/Input.jsx';
import { MoreOutlined, PlusCircleFilled } from '@ant-design/icons';
import { i18n, getLocale } from '../../utils/i18next';
import { deleteMark, getAllMarks } from '../../service/Feedback';
import { initialValues, marksByNum } from './constants';
import { Dropdown, Menu } from 'antd';
import NewLabelsModal from '../NewLabelsModal/NewLabelsModal';

const NewLabels = ({ num }) => {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(initialValues);

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
    setModalData(initialValues(num));
  };

  const getAllMarksList = () => {
    getAllMarks().then((res) => {
      const [finalData] = marksByNum(res.data, num);
      setData(finalData);
    });
  };

  useEffect(() => {
    getAllMarksList();
  }, []);

  const handleAddInput = () => {
    handleModal();
  };

  const handleMark = (item) => {
    handleModal();
    setModalData(item);
    console.log('modalData', modalData);
  };

  const handleDelete = (id) => {
    deleteMark(id).then((res) => {
      console.log(res.data);
      getAllMarksList();
    });
  };

  const menu = (item) => {
    return (
      <Menu>
        {<Menu.Item onClick={() => handleDelete(item.id)}>{i18n.t('actions.delete')}</Menu.Item>}
        {
          <Menu.Item
            onClick={() => {
              handleMark(item);
            }}
          >
            {i18n.t('actions.edit')}
          </Menu.Item>
        }
      </Menu>
    );
  };

  return (
    <div className={styles.inputBox}>
      <div className={styles.number}>{num}</div>
      {data?.map((item, index) => {
        return (
          <div style={{ position: 'relative' }} key={index}>
            <Input
              disabled
              key={index}
              value={item.markContents.find((item) => item.langKey === getLocale())?.text}
              maxLength={50}
              type="text"
              className={styles.inputItem}
              placeholder={i18n.t('feedback.mark')}
            />
            <Dropdown trigger={'click'} overlay={menu(item)}>
              <MoreOutlined
                style={{
                  fontSize: '1.5em',
                  position: 'absolute',
                  right: '0',
                  top: '50%',
                  transform: 'translateY(-50%)',
                }}
              />
            </Dropdown>
          </div>
        );
      })}
      {data?.length > 4 ? null : (
        <PlusCircleFilled className={styles.icon} onClick={handleAddInput} />
      )}
      {isModalOpen && (
        <NewLabelsModal
          modalData={modalData}
          handleModal={handleModal}
          isModalOpen={isModalOpen}
          getAllMarksList={getAllMarksList}
        />
      )}
    </div>
  );
};

export default NewLabels;
