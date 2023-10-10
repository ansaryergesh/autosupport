import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getResources } from '../../service/Resources/index.js';
import Button from '../../components/Button/Button.jsx';
import {
  editCategoryQuestion,
  getQuestionById,
  getQuestions,
} from '../../service/Question/index.js';
import JHeader from '../../components/JHeader/JHeader.jsx';
import { initialQuestionDto } from '../../components/JHeader/constants.js';
import Plus from 'images/plus.svg';
import { Col, Dropdown, notification, Row, Menu, Empty, Typography, Popconfirm, Spin } from 'antd';
import SunEditor from './SunEditor.jsx';
import styles from './index.module.less';
// import TypographyHead from '../../components/Typography/TypographyHead.jsx';
// import { TypoGraphyType } from '../../components/Typography/constants.js';
import { INSTRUCTION_TYPE, LANG_KEY } from '../../constants/index.js';
import { i18n } from '../../utils/i18next.js';
import ImageUpload from '../../components/ImageUpload/ImageUpload.jsx';
import { VideoInstruction } from '../../components/VideoInstruction/VideoInstruction';
import { searchKeyWords, manageKeyword } from '../../service/Keywords/index.js';
import SearchReference from '../SearchAutoComplete/SearchReference';
import { manageTag, searchTags } from '../../service/Tags/index.js';
import SearchSimilarQuestion from '../SearchAutoComplete/SearchSimilarQuestion';
import { initialQuestionAnswerContent } from './constants.js';
import {
  answerByQuestionAndResource,
  addAnswerToQuestion,
  editAnswerQuestion,
  deleteAnswerById,
} from '../../service/Answer/index.js';
import { useHistory } from 'react-router-dom';
import { LocalStorageKeys } from '../../storage/localStorageKey.js';
import CloneAnswerModal from '../../components/CloneAnswerModal/CloneAnswerModal.jsx';

const QuestionAnswerContent = () => {
  const { id } = useParams();
  const [resources, setResources] = useState([]);
  const [selectedResources, setSelectedResources] = useState([]);
  const [activeResource, setActiveResource] = useState({});
  const [questionInfo, setQuestionInfo] = useState({ initialQuestionDto });
  const [instructionType, setInstructionType] = useState(INSTRUCTION_TYPE.VISUAL);
  const [selectedKeyWords, setSelectedKeyWords] = useState(questionInfo?.keyWords || []);
  const [isEdited, setIsEdited] = useState(false);
  const [selectedTags, setSelectedTags] = useState(questionInfo?.tags || []);
  const [selectedLanguage, setSelectedLanguage] = useState(LANG_KEY.RU);
  const [loading, setLoading] = useState(false);

  const [answerFormData, setAnswerFormData] = useState(initialQuestionAnswerContent);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSimilarQuestion, setSelectedSimilarQuestion] = useState([]);
  // const requiredCharacter = 25;

  useEffect(() => {
    setLoading(true);
    localStorage.removeItem(LocalStorageKeys.ANSWER_FROM_DATA);
    getResources()
      .then((res) => {
        setResources(res.data);
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const menuResources = () => {
    return resources.map((resource) => {
      if (!selectedResources.some((selected) => selected.id === resource.id)) {
        const finalResources = { ...resource, isNew: true };
        return (
          <Menu.Item
            key={resource.id}
            onClick={() => {
              if (!activeResource?.id) {
                setActiveResource(finalResources);
              }
              setSelectedResources((prev) => [...prev, finalResources]);
            }}
          >
            {
              resource.resourceContents.find((content) => content.langKey === selectedLanguage)
                ?.name
            }
          </Menu.Item>
        );
      } else {
        return null;
      }
    });
  };

  const menu = (resource) => {
    const filtered = (prev) =>
      prev.filter((selectedResource) => selectedResource.id !== resource.id);

    const handleDelete = () => {
      if (resource.isNew) {
        setSelectedResources((prev) => {
          setActiveResource(filtered(prev) !== [] ? filtered(prev)[0] : {});
          return filtered(prev);
        });
      } else {
        setLoading(true);
        deleteAnswerById(answerFormData.id)
          .then(() => {
            setSelectedResources((prev) => {
              setActiveResource(filtered(prev) !== [] ? filtered(prev)[0] : {});
              return filtered(prev);
            });
          })
          .finally(() => {
            setLoading(false);
          });
      }
    };

    const handleCopy = (resourceId) => {
      answerByQuestionAndResource(id, resourceId).then((res) => {
        setAnswerFormData((prev) => {
          const resultData = res.data.answerContents.map((item) => {
            const matchedPrevId = prev.answerContents.find(
              (item2) => item.langKey === item2.langKey,
            )?.id;
            return { ...item, id: matchedPrevId };
          });

          return { ...prev, answerContents: resultData };
        });
      });
    };
    return (
      <>
        <Menu.Item
          key={resource.id}
          onClick={() => {
            handleDelete();
          }}
        >
          {i18n.t('actions.delete')}
        </Menu.Item>

        {resource.id === activeResource.id &&
          selectedResources?.map((res) => {
            if (res.id !== activeResource.id) {
              return (
                <Menu.Item
                  key={res.id}
                  onClick={() => {
                    handleCopy(res.id);
                  }}
                >
                  {`${i18n.t('questionAnswer.resourceClone')} 
            "${res.resourceContents.find((item) => item.langKey === selectedLanguage)?.name}"`}
                </Menu.Item>
              );
            }
          })}
      </>
    );
  };

  console.log(selectedResources);

  const history = useHistory();

  useEffect(() => {
    setLoading(true);
    getQuestionById(id)
      .then((res) => {
        setSelectedResources(res.data.resources || []);
        setQuestionInfo(res.data);
        res.data.resources && setActiveResource(res.data.resources[0]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    setIsEdited(false);
    setAnswerFormData({
      id: null,
      question: {
        id: 0,
        orderNumber: 0,
        counter: 0,
        categorie: {
          id: 0,
          orderNumber: 0,
          categorieContents: [
            {
              id: 0,
              langKey: 'EN',
              name: '',
            },
          ],
        },
        questionContents: [
          {
            id: 0,
            langKey: 'EN',
            title: '',
            stepDescription: '',
            tags: [
              {
                id: 0,
                text: '',
              },
            ],
            keyWords: [
              {
                id: 0,
                text: '',
              },
            ],
          },
        ],
      },
      resource: {
        id: 0,
        code: '',
        name: '',
      },
      answerContents: [
        {
          langKey: 'EN',
          stepDescription: '',
          videoUrl: '',
          videoDescription: '',
          images: [],
        },
        {
          langKey: 'RU',
          stepDescription: '',
          videoUrl: '',
          videoDescription: '',
          images: [],
        },
        {
          langKey: 'KZ',
          stepDescription: '',
          videoUrl: '',
          videoDescription: '',
          images: [],
        },
      ],
      status: null,
    });
    window.scrollTo(0, 0);
    if (activeResource?.id && !activeResource.isNew) {
      setLoading(true);
      setTimeout(() => {
        answerByQuestionAndResource(id, activeResource.id)
          .then((res) => {
            setAnswerFormData(res.data);
          })
          .catch((err) => {
            console.error(err);
          })
          .finally(() => {
            setLoading(false);
          });
      }, [500]);
    }
  }, [activeResource, id]);

  const saveNotification = () => {
    notification.success({
      message: i18n.t('questionAnswer.previewMessage'),
      placement: 'top',
    });
  };

  const handleSubmit = (withPreview = true) => {
    const similarQuestionsIds = selectedSimilarQuestion.map((item) => item?.id);
    const finalDataAnswer = {
      ...answerFormData,
      question: { id: questionInfo.id },
      resource: activeResource,
      similarQuestionsIds,
    };

    const finalQuestionInfo = {
      ...questionInfo,
      children: selectedQuestions,
    };
    delete finalQuestionInfo.resources;

    editCategoryQuestion(finalQuestionInfo).then(() => {});
    if (answerFormData.id) {
      editAnswerQuestion(finalDataAnswer, answerFormData.id).then(() => {
        if (withPreview) {
          saveNotification();
          history.push(`/question/preview/${id}/${activeResource.id}`);
        }
      });
    } else {
      delete finalDataAnswer['id'];
      addAnswerToQuestion(finalDataAnswer).then(() => {
        notification.info({ message: i18n.t('actions.edited') });
        withPreview && history.push(`/question/preview/${id}/${activeResource.id}`);
      });
    }
  };

  const handleChangeCounter = (counter) => {
    const parsedCounter = parseFloat(counter);

    if (!isNaN(parsedCounter)) {
      const finalQuestion = {
        ...questionInfo,
        counter: parsedCounter.toString(),
      };
      setQuestionInfo(finalQuestion);
    } else {
      const finalQuestion = {
        ...questionInfo,
        counter: questionInfo.counter,
      };
      setQuestionInfo(finalQuestion);
    }
  };

  const handleChangeResource = (resource) => {
    if (resource.id !== activeResource.id) {
      setSelectedLanguage(LANG_KEY.RU);
      setActiveResource(resource);
    }
  };
  return (
    <Spin spinning={loading}>
      <div>
        <JHeader questionInfo={questionInfo} lang={selectedLanguage} />
        <div
          style={{
            padding: '12px 0',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          {selectedResources.map((resource, index) => (
            <Dropdown key={index} overlay={<Menu>{menu(resource)}</Menu>} trigger={'contextMenu'}>
              <Button
                onClick={(e) => {
                  if (!isEdited && activeResource?.id !== resource.id) {
                    handleChangeResource(resource);
                  } else {
                    e.preventDefault(); // Prevent the default click behavior
                  }
                }}
                type={activeResource?.id === resource.id ? 'default-active' : 'default'}
              >
                {activeResource?.id === resource.id ? (
                  <p>
                    {
                      resource.resourceContents.find(
                        (content) => content.langKey === selectedLanguage,
                      )?.name
                    }
                  </p>
                ) : isEdited ? (
                  <Popconfirm
                    title={i18n.t('questionAnswer.titleSwitch')}
                    onConfirm={() => {
                      handleSubmit(false);
                      handleChangeResource(resource);
                    }}
                    cancelButtonProps={{ className: 'button-default' }}
                    okButtonProps={{ className: 'button-modal' }}
                    onCancel={() => {
                      handleChangeResource(resource);
                    }}
                    okText={i18n.t('questionAnswer.okSwitch')}
                    cancelText={i18n.t('questionAnswer.cancelSwitch')}
                  >
                    {
                      resource.resourceContents.find(
                        (content) => content.langKey === selectedLanguage,
                      )?.name
                    }
                  </Popconfirm>
                ) : (
                  <p>
                    {
                      resource.resourceContents.find(
                        (content) => content.langKey === selectedLanguage,
                      )?.name
                    }
                  </p>
                )}
              </Button>
            </Dropdown>
          ))}
          {selectedResources.length < resources.length && (
            <Dropdown overlay={<Menu>{menuResources()}</Menu>} trigger={'click'}>
              <img
                title={i18n.t({ message: 'actions.addResource' })}
                style={{ cursor: 'pointer' }}
                src={Plus}
              />
            </Dropdown>
          )}
        </div>
        <div
          style={{
            padding: '12px 0',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              padding: '12px 0',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            {Object.values(LANG_KEY).map((item) => (
              <Button
                key={item}
                onClick={() => setSelectedLanguage(item)}
                type={`${selectedLanguage === item ? 'default-active' : 'default'}`}
              >
                {item}
              </Button>
            ))}

            <Typography.Paragraph
              type="number"
              className={styles.counter}
              editable={{ onChange: handleChangeCounter }}
            >
              {questionInfo?.counter}
            </Typography.Paragraph>

            <b>{answerFormData.status && i18n.t(answerFormData.status)}</b>
          </div>

          <Button
            onClick={() => setIsModalOpen(!isModalOpen)}
            style={{ marginRight: '34px' }}
            type="modal"
          >
            {i18n.t('questionAnswer.cloneAnswer')}
          </Button>

          {activeResource.id ? (
            <CloneAnswerModal
              activeResource={activeResource}
              setAnswerFormData={setAnswerFormData}
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
            />
          ) : null}
        </div>

        {selectedResources.length > 0 ? (
          <>
            <Row
              style={{
                marginRight: '24px',
              }}
              gutter={[16, 24]}
            >
              <Col span={15}></Col>

              <Col span={15}>
                <Row gutter={[16, 16]}>
                  <Col span={24}>
                    <div className={styles.card}>
                      {/* <TypographyHead
                        type={TypoGraphyType.SUB_HEAD}
                        content={i18n.t('questionAnswer.descriptionTitle')}
                      /> */}
                      <SunEditor
                        isNew={activeResource.isNew}
                        setIsEdited={setIsEdited}
                        enableAutoFocus={false}
                        answerFormData={answerFormData}
                        setAnswerFormData={setAnswerFormData}
                        selectedLanguage={selectedLanguage}
                      />
                    </div>
                    <span className={styles.modifiedInfo}>
                      {`${i18n.t('questionAnswer.lastModified')}
                      ${answerFormData.modifiedInfo?.email}
                      ${new Date(answerFormData.modifiedInfo?.data).toLocaleString()}`}
                    </span>
                  </Col>
                  <Col span={24}>
                    <div className={styles.card}>
                      <div style={{ padding: '16px 0' }}>
                        {Object.values(INSTRUCTION_TYPE).map((item) => (
                          <Button
                            key={item}
                            onClick={() => setInstructionType(item)}
                            type={item === instructionType ? 'default-active' : 'default'}
                          >
                            {i18n.t(item)}
                          </Button>
                        ))}
                        {instructionType === INSTRUCTION_TYPE.VISUAL && (
                          <ImageUpload
                            setIsEdited={setIsEdited}
                            answerFormData={answerFormData}
                            setAnswerFormData={setAnswerFormData}
                            selectedLanguage={selectedLanguage}
                          />
                        )}
                        {instructionType === INSTRUCTION_TYPE.VIDEO && (
                          <VideoInstruction
                            setIsEdited={setIsEdited}
                            answerFormData={answerFormData}
                            setAnswerFormData={setAnswerFormData}
                            selectedLanguage={selectedLanguage}
                          />
                        )}
                      </div>
                    </div>
                  </Col>

                  <Col span={10}>
                    <Button type={'primary'} onClick={() => handleSubmit()}>
                      {i18n.t('actions.preview')}
                    </Button>
                  </Col>
                </Row>
              </Col>

              <Col span={9}>
                <Row gutter={[16, 16]}>
                  <Col span={24}>
                    <div className={styles.card}>
                      <SearchSimilarQuestion
                        title={i18n.t('actions.addSimilar')}
                        searchAction={getQuestions}
                        selectedItems={selectedQuestions}
                        setSelectedItems={setSelectedQuestions}
                        questionInfo={questionInfo}
                      />
                    </div>
                  </Col>
                  <Col span={24}>
                    <div className={styles.card}>
                      <SearchSimilarQuestion
                        title={i18n.t('actions.addSimilarQuestion')}
                        searchAction={getQuestions}
                        selectedItems={selectedSimilarQuestion}
                        setSelectedItems={setSelectedSimilarQuestion}
                        questionInfo={null}
                      />
                    </div>
                  </Col>
                  <Col span={24}>
                    <div className={styles.card}>
                      <SearchReference
                        keyItem={'keyWords'}
                        setQuestionInfo={setQuestionInfo}
                        questionInfo={questionInfo}
                        title={i18n.t('actions.addKeyword')}
                        searchAction={searchKeyWords}
                        selectedItems={selectedKeyWords}
                        setSelectedItems={setSelectedKeyWords}
                        addNewRecords={manageKeyword}
                        selectedLanguage={selectedLanguage}
                      />
                    </div>
                  </Col>
                  <Col span={24}>
                    <div className={styles.card}>
                      <SearchReference
                        keyItem={'tags'}
                        setQuestionInfo={setQuestionInfo}
                        questionInfo={questionInfo}
                        title={i18n.t('actions.addTag')}
                        searchAction={searchTags}
                        selectedItems={selectedTags}
                        setSelectedItems={setSelectedTags}
                        addNewRecords={manageTag}
                        selectedLanguage={selectedLanguage}
                      />
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </>
        ) : (
          <Empty description={i18n.t('noContent')} />
        )}
      </div>
    </Spin>
  );
};

export default QuestionAnswerContent;
