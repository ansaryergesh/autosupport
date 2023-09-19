import { Col, Form, Image, notification, Row } from 'antd';
import styles from '../index.module.less';
import Logo from 'images/logoFreedom.svg';
import Send from 'images/Send.svg';
import SendHover from 'images/SendHover.svg';
import Title from 'antd/lib/typography/Title.js';
import Button from 'components/Button/Button.jsx';
import Input from 'components/Input/Input.jsx';
import { getCurrentAccount, onLogin } from '../../../service/Auth/index.js';
import { LocalStorageKeys } from '../../../storage/localStorageKey.js';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { i18n } from '../../../utils/i18next.js';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [isHovered, setIsHovered] = useState(false);


  const onFinish = (values) => {
    setLoading(true);
    onLogin(values)
      .then((res) => {
        if (res) {
          if (res.data?.id_token) {
            getCurrentAccount(res.data?.id_token).then(res=> {
              location.reload();
              localStorage.setItem(LocalStorageKeys.ACCOUNT_DATA, JSON.stringify(res.data));
            })
            localStorage.setItem(LocalStorageKeys.FREEDOM_ACCESS_TOKEN, res.data?.id_token);
          }
          notification.success({ message: 'welcome' });
        }
      })

      .finally(() => {
        setLoading(false);
        console.log('finally');
      });
  };

  useEffect(() => {
    if (localStorage.getItem(LocalStorageKeys.FREEDOM_ACCESS_TOKEN)) {
      history.push('/');
    }
  }, []);

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const IconSend = () => {
    return <Image src={Send} preview={false} />;
  };
  const IconSendHover = () => {
    return <Image src={SendHover} preview={false} />;
  };

  return (
    <div className={styles.authBlock}>
      <Col span={24}>
        <Image src={Logo} preview={false} />
        <Title level={2}>{i18n.t('commons.signIn')}</Title>
        <span>{i18n.t('commons.comeBack')}</span>
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
                <Input size={'large'} placeholder="Почта" className={styles.inputItem} />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input
                  type="password"
                  size={'large'}
                  className={styles.inputItem}
                  placeholder="Пароль"
                />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item>
                <Button
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  type="modal"
                  className={styles.inputButton}
                  loading={loading}
                  iconButton={isHovered ? <IconSendHover /> : <IconSend />}
                  htmlType="submit"
                >
                  <span>Войти</span>
                </Button>
              </Form.Item>
              <Link to="/password-recovery">
                <span>Забыли пароль?</span>
              </Link>
            </Col>
          </Row>
        </Form>
      </Col>
    </div>
  );
};

export default SignIn;
