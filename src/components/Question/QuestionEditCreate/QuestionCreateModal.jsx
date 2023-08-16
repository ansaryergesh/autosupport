import React, { useState } from 'react'
import PropTypes from "prop-types";
import Input from "../../Input/index.js";
import {Form, Modal} from "antd";
import Button from "../../Button/Button.jsx";
import {initialQuestion} from "../constants.js";
const QuestionCreateModal = ({
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
            title={'Add category'}
            confirmLoading={loading}
            open={isModalOpen}
            footer={null}
            onCancel={handleModal}>

            <Form
                layout="vertical"
                initialValues={{initialQuestion}}
                onFinish={handleSubmit}
                autoComplete="off"
            >
                {initialQuestion.map((question, index) => (
                    <Form.Item key={index} label={`Title ${question.langKey}`}>
                        <Form.Item
                            name={['questionContent', index, 'title']}
                            rules={[{ required: true, message: 'title is required' }]}
                        >
                            <Input placeholder={`Enter name in ${question.langKey}`} />
                        </Form.Item>
                        <Form.Item
                            name={['questionContent', index, 'description']}
                            rules={[{ required: true, message: 'description is required' }]}
                        >
                            <Input placeholder={`description name in ${question.langKey}`} />
                        </Form.Item>
                        <Form.Item
                            name={['questionContent', index, 'langKey']}
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
}
export default QuestionCreateModal;