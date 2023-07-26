import { Col, Form, Image, Row} from "antd";
import styles from '../index.module.less';
import Logo from 'images/logoFreedom.svg';
import Title from "antd/lib/typography/Title.js";
import Button from "components/Button/Button.jsx";
import Input from "components/Input/Input.jsx";
const SignIn = () => {

    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className={styles.authBlock}>
            <Col span={24}>
                <Image src={Logo} preview={false}/>
                <Title level={1}>Вход</Title>
                <span>С возвращением!</span>
                <Form
                    name="basic"
                    style={{ maxWidth: 550 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Row gutter={[16]}>
                        <Col span={24}>
                            <Form.Item
                                name="username"
                                rules={[{ required: true, message: 'Please input your username!' }]}
                            >
                                <Input size={"large"} className={styles.inputItem}/>
                            </Form.Item>
                        </Col>

                        <Col span={24}>
                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Input size={"large"} className={styles.inputItem} />
                            </Form.Item>
                        </Col>

                        <Col span={24}>
                            <Form.Item>
                                <Button className={styles.inputButton} type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                            <span>Забыли пароль?</span>
                        </Col>
                    </Row>

                </Form>
            </Col>

        </div>
    )
}

export default SignIn;