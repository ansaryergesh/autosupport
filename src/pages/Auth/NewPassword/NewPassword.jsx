import { Col, Form, Image, Row, notification } from 'antd';
import styles from '../index.module.less';
import Logo from 'images/logoFreedom.svg';
import Title from 'antd/lib/typography/Title.js';
import Button from 'components/Button/Button.jsx';
import Input from 'components/Input/Input.jsx';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';
import { newPassword } from '../../../service/Auth';
import { i18n } from '../../../utils/i18next';

const NewPassword = () => {
  const history = useHistory();
  const queryParams = queryString.parse(history.location.search);
  const onFinish = (values) => {
    const key = queryParams.key;
    const data = {
      key,
      newPassword: values.newPassword,
    };
    newPassword(data).then(() => {
      notification.info({ message: i18n.t('passwordUpdated') });
      history.push('/sign-in');
    });
  };

  return (
    <div className={styles.authBlock}>
      <Col span={24}>
        <div className={styles.logoBox}>
          <div className={styles.logo}>
            <Image src={Logo} preview={false} />
          </div>
        </div>

        <Title level={2}>{i18n.t('passwordRecoveryTitle')}</Title>
        <span>{i18n.t('passwordRecovery')}</span>
        <Form
          name="basic"
          style={{ maxWidth: 550 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Row gutter={[16]}>
            <Col span={24}>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: i18n.t('rules.newPasswordRequired'),
                  },
                ]}
              >
                <Input
                  type="password"
                  size={'large'}
                  placeholder={i18n.t('createNewPassword')}
                  className={styles.inputItem}
                />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                name="newPassword"
                dependencies={['password']}
                rules={[
                  {
                    required: true,
                    message: i18n.t('rules.newPasswordRequired'),
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error(i18n.t('passwordsDoNotMatch')));
                    },
                  }),
                ]}
              >
                <Input
                  type="password"
                  size={'large'}
                  className={styles.inputItem}
                  placeholder={i18n.t('confirmNewPassword')}
                />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item>
                <Button type="primary" className={styles.inputButton} htmlType="submit">
                  {i18n.t('actions.save')}
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
