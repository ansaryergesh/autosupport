import { Form, Upload, Select, Row, Col, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import Input from 'components/Input/Input.jsx';
import InputTextArea from 'components/Input/textArea.jsx';
import Button from 'components/Button/Button.jsx';
import styles from './index.module.less';
import { selectPropsKeywords, selectPropsSimilar } from './constants';
import { getTags } from '../../service/NewQuestion';

const NewQuestion = () => {
  const [similarQuestions, setSimilarQuestions] = useState([]);
  const [tags, setTags] = useState([]);
  const [keywords, setKeywords] = useState([]);

  const getTagsList = () => {
    getTags().then((res) => {
      console.log(res.data);
    });
  };

  const selectPropsTags = {
    mode: 'multiple',
    // options: optionsTags,
    placeholder: 'Выберите теги',
    maxTagCount: 'responsive'
  };

  useEffect(() => {
    getTagsList();
  }, []);

  return (
    <div>
      <Typography className="my-heading">Форма</Typography>

      <Form layout="vertical">
        <Row gutter={[24, 24]}>
          <Col span={12}>
            <Form.Item
              name="Заголовок"
              label="Заголовок"
              rules={[{ required: true }]}>
              <InputTextArea
                className={styles.inputItems}
                autoSize={{ minRows: 1, maxRows: 15 }}
                placeholder="Заголовок"
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="Описание шагов"
              label="Описание шагов"
              rules={[{ required: true }]}>
              <InputTextArea
                className={styles.textArea}
                autoSize={{ minRows: 1, maxRows: 15 }}
                placeholder="Пошаговая инструкция"
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Видео инструкция">
              <Input className={styles.inputItems} placeholder="URL" />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item label="Визуальная инструкция">
              <Upload
                action="/upload.do"
                multiple={true}
                listType="picture-card">
                <div>
                  <PlusOutlined />
                  <div
                    style={{
                      marginTop: 8
                    }}>
                    Загрузить
                  </div>
                </div>
              </Upload>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Добавить похожие вопросы">
              <Select
                value={similarQuestions}
                {...selectPropsSimilar}
                onChange={(newValue) => {
                  setSimilarQuestions(newValue);
                }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Добавить теги">
              <Select
                value={tags}
                {...selectPropsTags}
                onChange={(newValue) => {
                  setTags(newValue);
                }}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Добавить ключевые слова">
              <Select
                value={keywords}
                {...selectPropsKeywords}
                onChange={(newValue) => {
                  setKeywords(newValue);
                }}
              />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Подтвердить
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default NewQuestion;
