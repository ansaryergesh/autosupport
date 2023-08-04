import { Col, Form, Image, Row } from 'antd';
import styles from '../index.module.less';
import Logo from 'images/logoFreedom.svg';
import Title from 'antd/lib/typography/Title.js';
import Button from 'components/Button/Button.jsx';
import Input from 'components/Input/Input.jsx';
import ArrowLeft from 'images/ArrowLeft.svg';
import { Link } from 'react-router-dom';

const NewPassword = () => {
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

        <Title level={2}>Смена пароля</Title>
        <span>Введите новый пароль и подтвердите</span>
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
                  { required: true, message: 'Please input your username!' }
                ]}>
                <Input
                  size={'large'}
                  placeholder="Придумайте новый пароль"
                  className={styles.inputItem}
                />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: 'Please input your password!' }
                ]}>
                <Input
                  size={'large'}
                  className={styles.inputItem}
                  placeholder="Подтвердите новый пароль"
                />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item>
                <Link to={'/sign-in'}>
                <Button
                  className={styles.inputButton}
                  type="primary"
                  htmlType="submit">
                  Сохранить
                </Button>
                </Link>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Col>
    </div>
  );
};

export default NewPassword;
