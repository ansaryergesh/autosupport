import React, { useState } from 'react'
import PropTypes from "prop-types";
import Input from "../../Input/index.js";
import {Form, Modal} from "antd";
import Button from "../../Button/Button.jsx";
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
            title={'Edit order'}
            confirmLoading={loading}
            open={isModalOpen}
            footer={null}
            onCancel={handleModal}>

            <Form
                labelCol={{ span: 8 }}
                layout="vertical"
                onFinish={handleSubmit}
                autoComplete="off"
            >
                    <Form.Item
                        name={'order'}
                        rules={[{ required: true, message: 'order is required' }]}
                    >
                        <Input  />
                    </Form.Item>
                <Form.Item
                    labelAlign={'right'}
                    wrapperCol={{span: 16 }}
                >
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