import { Col, Form, Image, Row } from 'antd';
import styles from '../index.module.less';
import Logo from 'images/logoFreedom.svg';
import Title from 'antd/lib/typography/Title.js';
import Button from 'components/Button/Button.jsx';
import Input from 'components/Input/Input.jsx';
import ArrowLeft from 'images/ArrowLeft.svg';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';
import { resetPassword } from '../../../service/Auth';

const NewPassword = () => {
  const history = useHistory();
  const queryParams = queryString.parse(history.location.search);
  const onFinish = (values) => {
    const key = queryParams.key;
    const data = {
      key,
      newPassword: values.newPassword
    }
    console.log(values);
    resetPassword(data).then(res => {
      console.log(res);
    })
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
                name="password"
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
                name="newPassword"
                dependencies={['password']}
                rules={[
                  { required: true, message: 'Please input your password!' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('The new password that you entered do not match!'));
                    },
                  }),
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
                <Button className={styles.inputButton} type="submit" htmlType="submit">
                  Сохранить
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Col>
    </div>
  );
};

export default NewPassword;
