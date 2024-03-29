import React, { useEffect, useState } from 'react';
import { Upload, Modal, Progress, notification } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { axiosInstanceWithHeader, originAddress } from '../../api/api.js';
import { removeImage } from './index.js';
import { i18n } from '../../utils/i18next.js';
import Input from '../Input/Input.jsx';
import ImageList from './ImageList.jsx';

const ImageUploader = ({ answerFormData, setAnswerFormData, selectedLanguage, setIsEdited }) => {
  const selectedLanguageItem = answerFormData.answerContents?.find(
    (item) => item.langKey === selectedLanguage,
  );
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState(selectedLanguageItem?.images || []);
  const [editingImage, setEditingImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const handleCancel = () => setPreviewVisible(false);
  const domainName = originAddress;
  useEffect(() => {
    updateAnswerFormData();
  }, [fileList]);

  useEffect(() => {
    setFileList(selectedLanguageItem?.images);
  }, [answerFormData]);

  useEffect(() => {
    setFileList(selectedLanguageItem?.images);
  }, [selectedLanguage]);

  const updateAnswerFormData = () => {
    const updatedAnswerContent = { ...answerFormData };
    const index = answerFormData?.answerContents.findIndex(
      (content) => content.langKey === selectedLanguage,
    );
    if (index !== -1) {
      updatedAnswerContent.answerContents[index].images = fileList;
      setAnswerFormData(updatedAnswerContent);
    }
  };

  const displayFileList =
    Array.isArray(fileList) &&
    fileList.map((file,index) => {
      if (file.url) {
        return {
          ...file,
          imageOrder: index+1,
          uid: file.id,
          url: `${domainName}${file.url}`, // Append domain name to the URL
        };
      }
      return file;
    });

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setEditingImage(file);
  };

  const uploadImage = async (options) => {
    const { onSuccess, onError, file, onProgress } = options;

    const fmData = new FormData();
    const config = {
      headers: { 'content-type': 'multipart/form-data' },
      onUploadProgress: (event) => {
        const percent = Math.floor((event.loaded / event.total) * 100);
        setProgress(percent);
        if (percent === 100) {
          setTimeout(() => setProgress(0), 1000);
        }
        onProgress({ percent: (event.loaded / event.total) * 100 });
      },
    };
    fmData.append('file', file);
    try {
      const res = await axiosInstanceWithHeader.post('/api/admin/image', fmData, config);
      setFileList((prevState) => {
        const newFile = {
          uid: res.data.id,
          id: res.data.id,
          status: 'done',
          description: null,
          imageOrder: fileList.length + 1,
          url: res.data.url, // Replace with the URL of the uploaded image
        };
        const newState = [...prevState, newFile];
        handlePreview(newFile);

        return newState;
      });
      setIsEdited(true);
      onSuccess('Ok');
    } catch (err) {
      console.error('Error: ', err);
      onError({ err });
    }
  };

  const handleSaveDescription = (description) => {
    setIsEdited(true);

    if (description) {
      const newFileList = fileList.map((item) => {
        if (item.id === editingImage.id) {
          return { ...item, description };
        }
        return item;
      });

      setFileList(newFileList);
      setEditingImage(null);
      setPreviewVisible(false);
      setPreviewImage(null);
    } else {
      notification.error({ message: i18n.t('rule.descriptionRequired') });
    }
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>{i18n.t('upload')}</div>
    </div>
  );

  const getBase64 = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
    });
  };

  const handleRemove = (file) => {
    const { confirm } = Modal;
    return new Promise((resolve, reject) => {
      confirm({
        title: i18n.t('actions.sure'),
        okButtonProps: { className: 'button-modal' },
        cancelButtonProps: { className: 'button-default' },
        onOk: () => {
          resolve(true);

          removeImage(file.id).then(() => {
            setIsEdited(true);
            const newFileList = fileList.filter((item) => item.id !== file.id);
            setFileList(newFileList);
          });
        },
        onCancel: () => {
          reject(true);
        },
      });
    });
  };

  return (
    <div style={{ marginTop: '10px' }}>
      <ImageList displayFileList={displayFileList} fileList={fileList} setFileList={setFileList} handleRemove={handleRemove} handlePreview={handlePreview} />

      <Upload
        multiple={true}
        accept={('image/jpeg', 'image/jpg', 'image/png')}
        maxCount={10}
        fileList={[]}
        // action="//jsonplaceholder.typicode.com/posts/"
        customRequest={uploadImage}
        listType="picture-card"

      >
        {uploadButton}
      </Upload>

      <Modal
        okButtonProps={{ className: 'button-modal' }}
        cancelButtonProps={{ className: 'button-default' }}
        visible={previewVisible}
        cancelText={i18n.t('actions.cancel')}
        onCancel={handleCancel}
        okText={i18n.t('actions.save')}
        onOk={() => handleSaveDescription(editingImage.description)}
      >
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '20px', padding: '15px'}}>
          <img
            alt="Preview"
            style={{ maxWidth: '100%', maxHeight:'400px', textAlign: 'center', margin:'auto' }}
            src={previewImage?.includes('http') ? previewImage : `${domainName}${previewImage}`}
          />
          <Input
            placeHolder={i18n.t('description')}
            value={editingImage ? editingImage.description : ''}
            onChange={(e) => {
              if (editingImage) {
                const newEditingImage = {
                  ...editingImage,
                  description: e.target.value,
                };
                setEditingImage(newEditingImage);
              }
            }}
            onPressEnter={() => handleSaveDescription(editingImage.description)}
          />
        </div>

      </Modal>
      {progress > 0 ? <Progress percent={progress} /> : null}
    </div>
  );
};

export default ImageUploader;
