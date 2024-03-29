import React from 'react';
import Input from '../Input/Input.jsx';
import ReactPlayer from 'react-player';
import { i18n } from '../../utils/i18next';

export const VideoInstruction = ({
  answerFormData,
  setAnswerFormData,
  selectedLanguage,
  setIsEdited,
}) => {
  const selectedLanguageItem = answerFormData.answerContents?.find(
    (item) => item.langKey === selectedLanguage,
  );
  const handleChangeInput = (name, value) => {
    setIsEdited(true);
    const updatedAnswerContent = { ...answerFormData };
    const index = answerFormData?.answerContents.findIndex(
      (content) => content.langKey === selectedLanguage,
    );

    if (index !== -1) {
      updatedAnswerContent.answerContents[index][name] = value;
      setAnswerFormData(updatedAnswerContent);
    }
  };

  return (
    <div>
      <Input
        style={{ margin: '8px 0' }}
        placeholder={i18n.t('questionAnswer.videoUrl')}
        value={selectedLanguageItem?.videoUrl}
        onChange={(e) => handleChangeInput('videoUrl', e.target.value)}
      />
      {selectedLanguageItem?.videoUrl && <ReactPlayer url={selectedLanguageItem?.videoUrl} />}
      <Input
        style={{ margin: '8px 0' }}
        placeholder={i18n.t('description')}
        value={selectedLanguageItem?.videoDescription}
        onChange={(e) => handleChangeInput('videoDescription', e.target.value)}
      />
    </div>
  );
};
