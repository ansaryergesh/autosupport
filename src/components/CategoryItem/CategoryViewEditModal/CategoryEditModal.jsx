import React, { useState } from 'react'
import PropTypes from "prop-types";
import Input from "../../Input/index.js";
import {Form, Modal} from "antd";
import Button from "../../Button/Button.jsx";
import {initialCategoryContents} from "../constants.js";
const CategoryCreateModal = ({
                                 isModalOpen = false,
                                 handleModal,
                             }) => {
    const [loading, setLoading] = useState(false);
    const handleSubmit = (values) => {
        setLoading(true);
        console.log(values)
    }

    return (
        <Modal
            title={'Edit category'}
            confirmLoading={loading}
            open={isModalOpen}
            footer={null}
            onCancel={handleModal}>

            <Form
                layout="vertical"
                initialValues={{initialCategoryContents}}
                onFinish={handleSubmit}
                autoComplete="off"
            >
                {initialCategoryContents.map((content, index) => (
                    <Form.Item key={index} label={`Name ${content.langKey}`}>
                        <Form.Item
                            name={['categoryContents', index, 'name']}
                            rules={[{ required: true, message: 'Name is required' }]}
                            style={{ marginBottom: 0 }}
                        >
                            <Input placeholder={`Enter name in ${content.langKey}`} />
                        </Form.Item>
                        <Form.Item
                            name={['categoryContents', index, 'langKey']}
                            initialValue={content.langKey}
                            style={{ display: 'none' }}
                        >
                            <Input type="hidden" />
                        </Form.Item>
                    </Form.Item>
                ))}

                <Form.Item labelAlign={'right'}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};
CategoryCreateModal.propTypes = {
    isModalOpen: PropTypes.bool,
    handleModal: PropTypes.func,
}
export default CategoryCreateModal;