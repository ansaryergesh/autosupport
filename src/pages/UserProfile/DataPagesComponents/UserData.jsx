import { Col, Form } from 'antd';
import React, { useEffect, useState } from 'react'
import Title from 'antd/lib/typography/Title.js';
import Input from '../../../components/Input/Input';
import { getAccountData } from '../../../service/Profile';
import { i18n } from '../../../utils/i18next.js';


const initialData = {
    "id": 1,
    "login": "super_admin",
    "firstName": "Super Administrator",
    "lastName": "Super Administrator",
    "email": "super_admin@localhost",
    "imageUrl": "",
    "activated": true,
    "langKey": "ru",
    "createdBy": "system",
    "createdDate": null,
    "lastModifiedBy": "system",
    "lastModifiedDate": null,
    "authorities": [
        "ROLE_SUPER_ADMIN"
    ],
    "authOrganization": null
}



const UserData = () => {
    const [data, setData] = useState(initialData)

    useEffect(() => {
        getAccountData().then(res => {
            setData(res.data)
        })
    }, [])

    return (
        <Form
            layout="vertical">
            <Col span={12}>
                <Title level={2}>{i18n.t('userProfile.userDataTitle')}</Title>
                <Form.Item
                    name="login"
                    label={i18n.t('userProfile.loginLabel')}
                    rules={[
                        {
                            type: 'login',
                            message: 'The input is not valid Login!',
                        },
                        {
                            message: 'Please input your Login!',
                        },
                    ]}
                >
                    <Input defaultValue={data.login} readOnly />
                </Form.Item>
                <Form.Item
                    name="firstName"
                    label={i18n.t('userProfile.firstNameLabel')}
                    rules={[
                        {
                            type: 'firstName',
                            message: 'The input is not valid First Name!',
                        },
                        {
                            message: 'Please input your First Name!',
                        },
                    ]}
                >
                    <Input defaultValue={data.firstName} readOnly />
                </Form.Item>
                <Form.Item
                    name="lastName"
                    label={i18n.t('userProfile.lastNameLabel')}
                    rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid Last Name!',
                        },
                        {
                            message: 'Please input your Last Name!',
                        },
                    ]}
                >
                    <Input defaultValue={data.lastName} readOnly />
                </Form.Item>
                <Form.Item
                    name="authOrganization"
                    label={i18n.t('userProfile.organizationLabel')}
                    rules={[
                        {
                            type: 'organization',
                            message: 'The input is not valid Organization!',
                        },
                        {
                            message: 'Please input your Organization!',
                        },
                    ]}
                >
                    <Input defaultValue={data.authOrganization?.code} disabled={true} />
                </Form.Item>
            </Col>
        </Form>
    )
}

export default UserData