import React, { useEffect, useState } from 'react';
import styles from './index.module.less';
import Input from 'components/Input/Input.jsx';
import { MoreOutlined, PlusCircleFilled } from '@ant-design/icons';
import { i18n, getLocale } from '../../utils/i18next';
import { deleteMark, getAllMarks } from '../../service/Feedback';
import { initialValues, marksByNum } from './constants';
import { Dropdown, Menu, Popconfirm } from 'antd';
import NewLabelsModal from '../NewLabelsModal/NewLabelsModal';
import { checkPermissions } from '../../helpers/checkPermission';

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

  const handleMark = (item) => {
    handleModal();
    setModalData(item);
  };

  const handleDelete = (id) => {
    deleteMark(id).then(() => {
      getAllMarksList();
    });
  };

  const menu = (item) => {
    return (
      <Menu>
        {
          <Popconfirm
            title={i18n.t('actions.sure')}
            cancelText={i18n.t('actions.cancel')}
            okButtonProps={{
              className: 'button-modal',
            }}
            cancelButtonProps={{ className: 'button-default' }}
            onConfirm={() => handleDelete(item.id)}
          >
            <Menu.Item>{i18n.t('actions.delete')}</Menu.Item>
          </Popconfirm>
        }
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
            {checkPermissions(['ROLE_SUPER_ADMIN', 'ROLE_WATCHER']) ? null : (
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
            )}
          </div>
        );
      })}
      {checkPermissions(['ROLE_SUPER_ADMIN', 'ROLE_WATCHER']) ? null : data?.length > 4 ? null : (
        <PlusCircleFilled
          className={styles.icon}
          onClick={() => {
            handleModal();
          }}
        />
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
