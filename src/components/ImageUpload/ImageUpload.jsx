import React, {useEffect, useState} from 'react';
import {Upload, Modal, Input, Progress, notification} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {axiosInstanceWithHeader} from "../../api/api.js";
import {removeImage} from "./index.js";


const ImageUploader = ({answerFormData, setAnswerFormData, selectedLanguage}) => {
    const selectedLanguageItem = answerFormData.answerContents?.find(item => item.langKey === selectedLanguage);
    console.log(selectedLanguageItem?.images)
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState(selectedLanguageItem?.images || []);
    const [editingImage, setEditingImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const handleCancel = () => setPreviewVisible(false);

    const domainName = 'http://localhost:8080'

    useEffect(() => {
        updateAnswerFormData()
    },[fileList])

    useEffect(() => {
        setFileList(selectedLanguageItem?.images)
    },[selectedLanguage])

    const updateAnswerFormData = () => {
        const updatedAnswerContent = { ...answerFormData };
        const index = answerFormData?.answerContents.findIndex(content => content.langKey === selectedLanguage);
        if (index !== -1) {
            updatedAnswerContent.answerContents[index].images = fileList;
            setAnswerFormData(updatedAnswerContent);
        }
    }

    // const displayFileList = Array.isArray(fileList) && fileList.map((file) => {
    //     if (file.url) {
    //         return {
    //             ...file,
    //             url: `${domainName}${file.url}` // Append domain name to the URL
    //         };
    //     }
    //     return file;
    // });

    const handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        setPreviewImage(`${domainName}${file.url}` || file.preview);
        setPreviewVisible(true);
        setEditingImage(file);
    };

    const handleRemove = file => {
        removeImage(file.id).then(res=> {
            console.log(res)
            const newFileList = fileList.filter(item => item.id !== file.id);
            setFileList(newFileList);
        })
    };


    const uploadImage = async options => {
        const { onSuccess, onError, file, onProgress } = options;

        const fmData = new FormData();
        const config = {
            headers: { "content-type": "multipart/form-data" },
            onUploadProgress: event => {
                const percent = Math.floor((event.loaded / event.total) * 100);
                setProgress(percent);
                if (percent === 100) {
                    setTimeout(() => setProgress(0), 1000);
                }
                onProgress({ percent: (event.loaded / event.total) * 100 });
            }
        };
        fmData.append("file", file);
        try {
            const res = await axiosInstanceWithHeader.post(
                "/api/admin/image",
                fmData,
                config
            );
            setFileList((prevState => {
                const newFile = {
                    id: res.data.id,
                    status: 'done',
                    description: null,
                    imageOrder: prevState.length+1,
                    thumbUrl: 'http://localhost:8080' + res.data.url,// Replace with the unique identifier for the image
                    url: res.data.url,  // Replace with the URL of the uploaded image
                };
                const newState = [...prevState,newFile];
                setFileList(newState);
                handlePreview(newFile)
            }))
            onSuccess("Ok");
            console.log("server res: ", res);
        } catch (err) {
            console.log("Error: ", err);
            onError({ err });
        }
    };

    const handleSaveDescription = description => {
        if(description) {
            const newFileList = fileList.map(item => {
                if (item.uid === editingImage.uid) {
                    return { ...item, description };
                }
                return item;
            });

            setFileList(newFileList);
            setEditingImage(null);
            setPreviewVisible(false)
            setPreviewImage(null)
        } else {
            notification.error({message: 'Description is required'})
        }

    };

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    const getBase64 = file => {
        return new Promise(resolve => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
        });
    };

    return (
        <div style={{marginTop: '10px'}}>
            <Upload
                accept={"image/jpeg", 'image/jpg', 'image/png'}
                maxCount={10}
                // action="//jsonplaceholder.typicode.com/posts/"
                customRequest={uploadImage}
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onRemove={handleRemove}
            >
                {uploadButton}
            </Upload>
            <Modal visible={previewVisible}
                   onCancel={handleCancel}
                   okText={'Save'}
                   onOk={() => handleSaveDescription(editingImage.description)}>
                <img alt="Preview" style={{ width: '100%' }} src={previewImage} />
                <Input
                    placeHolder={'Description of image'}
                    value={editingImage ? editingImage.description : ''}
                    onChange={e => {
                        if (editingImage) {
                            const newEditingImage = { ...editingImage, description: e.target.value };
                            setEditingImage(newEditingImage);
                        }
                    }}
                    onPressEnter={() => handleSaveDescription(editingImage.description)}
                />
            </Modal>
            {progress > 0 ? <Progress percent={progress} /> : null}
        </div>
    );
};

export default ImageUploader;
