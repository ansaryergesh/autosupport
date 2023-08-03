import { Col, Form, Image, Row } from 'antd';
import styles from '../index.module.less';
import Logo from 'images/logoFreedom.svg';
import ArrowLeft from 'images/ArrowLeft.svg';
import Title from 'antd/lib/typography/Title.js';
import Button from 'components/Button/Button.jsx';
import Input from 'components/Input/Input.jsx';

const PasswordRecovery = () => {
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const ArrowBack = () => {
    return (
      <Image src={ArrowLeft} preview={false} className={styles.btnBackIcon} />
    );
  };
  return (
    <div className={styles.authBlock}>
      <Col span={24}>
        <div className={styles.logoBox}>
          <Button
            type="text"
            className={styles.btnBack}
            iconButton={<ArrowBack />}
            iconPosition={'left'}>
            Назад
          </Button>
          <div className={styles.logo}>
            <Image src={Logo} preview={false} />
          </div>
        </div>
        <Title level={2}>Восстановление пароля</Title>
        <span>Введите почту для восстановления пароля</span>
        <Form
          name="basic"
          style={{ maxWidth: 550 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off">
          <Row gutter={[16]}>
            <Col span={24}>
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: 'Please input your email!' }
                ]}>
                <Input
                  size={'large'}
                  placeholder="Почта"
                  className={styles.inputItem}
                />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item>
                <Button
                  className={styles.inputButton}
                  type="primary"
                  htmlType="submit">
                  Отправить код
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Col>
    </div>
  );
};

export default PasswordRecovery;
