import React, { useState} from 'react'
import PropTypes from "prop-types";
import Input from "../../Input/index.js";
import {Form, Modal, notification} from "antd";
import Button from "../../Button/Button.jsx";
import {initialQuestion} from "../constants.js";
import {createCategoryQuestion} from "../../../service/Category/index.js";
const QuestionCreateModal = ({
                                 isModalOpen = false,
                                 handleModal,
                                 categoryId,
    getCategoryAll,
                             }) => {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    const handleSubmit = (values) => {
        console.log(categoryId)

        createCategoryQuestion({categorie:{id: categoryId}, ...values}).then(res=> {
            console.log(res)
            notification.success({message: 'question created'})
            form.resetFields();
            getCategoryAll();
            handleModal();
        }).finally(() => {
            setLoading(false);
        })
    }

    return (
        <Modal
            title={'Add question'}
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
                initialValues={{initialQuestion}}
                onFinish={handleSubmit}
                autoComplete="off"
            >
                {initialQuestion.map((question, index) => (
                    <Form.Item key={index} label={`Title ${question.langKey}`}>
                        <Form.Item
                            name={['questionContents', index, 'title']}
                            rules={[{ required: true, message: 'title is required' }]}
                        >
                            <Input placeholder={`Enter name in ${question.langKey}`} />
                        </Form.Item>
                        <Form.Item
                            name={['questionContents', index, 'stepDescription']}
                            rules={[{ required: true, message: 'description is required' }]}
                        >
                            <Input placeholder={`description name in ${question.langKey}`} />
                        </Form.Item>
                        <Form.Item
                            name={['questionContents', index, 'langKey']}
                            initialValue={question.langKey}
                            style={{ display: 'none' }}
                        >
                            <Input type="hidden" />
                        </Form.Item>
                    </Form.Item>
                ))}

                <Form.Item labelAlign={'right'}>
                    <Button loading={loading} type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};
QuestionCreateModal.propTypes = {
    isModalOpen: PropTypes.bool,
    handleModal: PropTypes.func,
    categoryId: PropTypes.number,
    getCategoryAll: PropTypes.func,

}
export default QuestionCreateModal;