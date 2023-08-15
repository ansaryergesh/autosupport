import { Form, Upload, Select, Row, Col, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import Input from 'components/Input/Input.jsx';
import InputTextArea from 'components/Input/textArea.jsx';
import Button from 'components/Button/Button.jsx';
import styles from './index.module.less';
import { getTags, manageTag } from '../../service/Tags/index.js';
import { getKeywords, manageKeyword } from '../../service/Keywords/index.js';

const AddNewAnswer = () => {
  const [similarQuestions, setSimilarQuestions] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectTags, setSelectedTags] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [selectKeywords, setSelectedKeyWords] = useState([]);

  const getTagsList = () => {
    getTags().then((res) => {
      setTags(res.data);
    });
  };

  const getKeywordsList = () => {
    getKeywords().then((res) => {
      setKeywords(res.data);
    });
  };

  useEffect(() => {
    getKeywordsList();
    getTagsList();
  }, []);

  const selectPropsKeywords = {
    mode: 'multiple',
    placeholder: 'Выберите ключевые слова',
    maxTagCount: 'responsive'
  };

  const selectPropsTags = {
    mode: 'multiple',
    placeholder: 'Выберите теги',
    maxTagCount: 'responsive'
  };

  const selectPropsSimilar = {
    mode: 'multiple',
    // options: optionsSimilar,
    placeholder: 'Выберите похожие вопросы',
    maxTagCount: 'responsive'
  };

  const onAddKeyword = (e) => {
    const buttonKey = e.key;
    const text = e.target.value;
    if (e.target.value.length > 3 && buttonKey === 'Enter') {
      e.stopPropagation();
      manageKeyword({ id: null, text }).then((res) => {
        setKeywords([...keywords, res.data]);
        setSelectedKeyWords([...selectKeywords, res.data.id]);
      });
    }
  };

  const onAddTag = (e) => {
    const buttonKey = e.key;
    const text = e.target.value;
    if (buttonKey === 'Enter') {
      e.stopPropagation();
      manageTag({ id: null, text }).then((res) => {
        setTags([...tags, res.data]);
        setSelectedTags([...selectTags, res.data.id]);
      });
    }
  };

  return (
    <div>
      <Typography className="my-heading">Добавление нового ответа</Typography>

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
                value={selectTags}
                onInputKeyDown={(e) => onAddTag(e)}
                {...selectPropsTags}
                onChange={(newValue) => {
                  setSelectedTags(newValue);
                }}>
                {tags.map((item) => (
                  <Select.Option key={item.id} value={item.id}>
                    {item.text}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Добавить ключевые слова">
              <Select
                value={selectKeywords}
                {...selectPropsKeywords}
                onInputKeyDown={(e) => onAddKeyword(e)}
                onChange={(newValue) => {
                  setSelectedKeyWords(newValue);
                }}>
                {keywords.map((item) => (
                  <Select.Option key={item.id} value={item.id}>
                    {item.text}
                  </Select.Option>
                ))}
              </Select>
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

export default AddNewAnswer;
