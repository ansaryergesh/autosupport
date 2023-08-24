import React, { useState } from 'react';
import { Upload, Input, Form, Slider } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const ImageUploadSlider = () => {
    const [imageList, setImageList] = useState([]);

    const handleUploadChange = async info => {
        if (info.file.status === 'done') {
            const response = await uploadImage(info.file);
            if (response.success) {
                setImageList([...imageList, { url: response.url, description: '', order: 1 }]);
            }
        }
    };

    const uploadImage = async file => {
        console.log(file)
        // Upload logic, similar to the previous examples
    };

    const handleDescriptionChange = (index, description) => {
        const updatedImageList = [...imageList];
        updatedImageList[index].description = description;
        setImageList(updatedImageList);
    };

    const handleRatingChange = (index, rating) => {
        const updatedImageList = [...imageList];
        updatedImageList[index].rating = rating;
        setImageList(updatedImageList);
    };

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    const imageListItems = imageList.map((image, index) => (
        <div key={index} style={{ marginBottom: 16 }}>
            <img src={image.url} alt={`Image ${index}`} style={{ width: '100%', maxWidth: 200 }} />
            <Input
                placeholder="Enter description"
                value={image.description}
                onChange={e => handleDescriptionChange(index, e.target.value)}
                style={{ marginTop: 8 }}
            />
            <Slider
                value={image.rating}
                onChange={value => handleRatingChange(index, value)}
                marks={{ 0: '0', 10: '10' }}
                step={1}
            />
        </div>
    ));

    return (
        <div>
            <Upload
                action="/your-upload-endpoint"
                listType="picture-card"
                onChange={handleUploadChange}
            >
                {imageList.length >= 5 ? null : uploadButton}
            </Upload>
            <Form>
                {imageListItems}
            </Form>
        </div>
    );
};

export default ImageUploadSlider;
