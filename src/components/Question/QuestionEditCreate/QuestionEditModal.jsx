import React, { useState } from 'react'
import PropTypes from "prop-types";
import Input from "../../Input/index.js";
import {Form, Modal, notification} from "antd";
import Button from "../../Button/Button.jsx";
import {initialQuestion} from "../constants.js";
import {editCategoryQuestion} from "../../../service/Question/index.js";
const QuestionEditModal = ({
                                 isModalOpen = false,
                                 handleModal,
                                 questionInfo,
                                 getCategoryAll,
                             }) => {
    const [loading, setLoading] = useState(false);
    const handleSubmit = (values) => {
        setLoading(true)
        editCategoryQuestion({...questionInfo, ...values}).then(res=> {
            console.log(res)
            notification.success({message: "Edited category"});
            handleModal();
            getCategoryAll();

        }).finally(() => setLoading(false));

    }

    const {questionContents} = questionInfo;
    console.log(questionContents)
    const mergedCategories = initialQuestion?.map((initialCategory) => {
        const existingCategory = questionContents?.find(
            (item) => item.langKey === initialCategory.langKey
        );

        if (existingCategory) {
            return {
                ...initialCategory,
                title: existingCategory.title,
                stepDescription: existingCategory.stepDescription,
                id: existingCategory.id,

            };
        }

        return initialCategory;
    });
    const finalContent = questionInfo !== {} ? mergedCategories : initialQuestion;
    console.log(questionInfo)
    return (
        <Modal
            title={'Edit category'}
            confirmLoading={loading}
            open={isModalOpen}
            footer={null}
            onCancel={handleModal}>

            <Form
                layout="vertical"
                initialValues={{finalContent}}
                onFinish={handleSubmit}
                autoComplete="off"
            >
                {finalContent.map((question, index) => (
                    <Form.Item key={index} label={`Title ${question.langKey}`}>
                        <Form.Item
                            initialValue={question?.title}
                            name={['questionContents', index, 'title']}
                            rules={[{ required: true, message: 'title is required' }]}
                        >
                            <Input placeholder={`Enter name in ${question.langKey}`} />
                        </Form.Item>
                        <Form.Item
                            initialValue={question?.stepDescription}
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
                        <Form.Item
                            name={['questionContents', index, 'id']}
                            initialValue={question.id}
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
QuestionEditModal.propTypes = {
    isModalOpen: PropTypes.bool,
    handleModal: PropTypes.func,
    questionInfo: PropTypes.object,
    getCategoryAll: PropTypes.func,
}
export default QuestionEditModal;