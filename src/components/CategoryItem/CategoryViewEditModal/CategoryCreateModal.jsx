import React, { useState } from 'react'
import PropTypes from "prop-types";
import Input from "../../Input/index.js";
import {Form, Modal} from "antd";
import Button from "../../Button/Button.jsx";
import {initialCategoryContents} from "../constants.js";
import {createCategory} from "../../../service/Category/index.js";
const CategoryCreateModal = ({
    isModalOpen = false,
    handleModal,
}) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const handleSubmit = (values) => {
        setLoading(true);
        createCategory({...values})
            .then(res=> {
                console.log(res)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <Modal
            title={'Add category'}
            confirmLoading={loading}
            open={isModalOpen}
            footer={null}
            onCancel={() => {
                handleModal();
                form.resetFields()
            }}>

            <Form
                form={form}
                layout="vertical"
                initialValues={{initialCategoryContents}}
                onFinish={handleSubmit}
                autoComplete="off"
            >
                {initialCategoryContents.map((content, index) => (
                    <Form.Item key={index} label={`Name ${content.langKey}`}>
                        <Form.Item
                            name={['categorieContents', index, 'name']}
                            rules={[{ required: true, message: 'Name is required' }]}
                            style={{ marginBottom: 0 }}
                        >
                            <Input placeholder={`Enter name in ${content.langKey}`} />
                        </Form.Item>
                        <Form.Item
                            name={['categorieContents', index, 'langKey']}
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