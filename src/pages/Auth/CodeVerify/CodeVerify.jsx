import { Col, Form, Image, Row, Space } from 'antd';
import styles from '../index.module.less';
import Logo from 'images/logoFreedom.svg';
import Title from 'antd/lib/typography/Title.js';
import Button from 'components/Button/Button.jsx';
import Input from 'components/Input/Input.jsx';
import ArrowLeft from 'images/ArrowLeft.svg';
import { Link } from 'react-router-dom';

const CodeVerify = () => {
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const ArrowBack = () => {
    return <Image src={ArrowLeft} preview={false} className={styles.btnBackIcon} />;
  };

  return (
    <div className={styles.authBlock}>
      <Col span={24}>
        <div className={styles.logoBox}>
          <Button
            type="text"
            className={styles.btnBack}
            iconButton={<ArrowBack />}
            iconPosition={'left'}
          >
            Назад
          </Button>
          <div className={styles.logo}>
            <Image src={Logo} preview={false} />
          </div>
        </div>

        <Title level={2}>Код подтверждения</Title>
        <span>Введите код подтверждения</span>
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
              <Form.Item>
                <Space size="large">
                  <Input type="number" className={styles.verifyInput} />
                  <Input type="number" className={styles.verifyInput} />
                  <Input type="number" className={styles.verifyInput} />
                  <Input type="number" className={styles.verifyInput} />
                </Space>
              </Form.Item>
            </Col>

            <Col span={24}>
              <p>Можете отправить повторный код через 00:38, если код не пришел.</p>
              <p className={styles.resend}>Отправить повторно</p>
            </Col>

            <Col span={24}>
              <Form.Item>
                <Link to={'/new-password'}>
                  <Button className={styles.inputButton} htmlType="submit">
                    Далее
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

export default CodeVerify;
