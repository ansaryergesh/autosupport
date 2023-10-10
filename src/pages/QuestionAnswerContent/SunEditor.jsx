import React, { useState, useEffect } from 'react';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import { checkPermissions } from '../../helpers/checkPermission';

const MyComponent = ({
  answerFormData,
  setAnswerFormData,
  selectedLanguage,
  setIsEdited,
  isNew = false,
}) => {
  const selectedLanguageItem = answerFormData.answerContents?.find(
    (item) => item.langKey === selectedLanguage,
  );

  const [editorContent, setEditorContent] = useState(selectedLanguageItem?.stepDescription || '');
  useEffect(() => {
    if (!isNew && editorContent !== selectedLanguageItem?.stepDescription) {
      setIsEdited(true);
    }
    handleContentChange(editorContent);
  }, [editorContent]);

  useEffect(() => {
    setEditorContent(selectedLanguageItem?.stepDescription);
  }, [answerFormData, selectedLanguageItem]);

  const handleContentChange = (value) => {
    setIsEdited(true);
    const updatedAnswerContent = { ...answerFormData };
    const index = answerFormData?.answerContents.findIndex(
      (content) => content.langKey === selectedLanguage,
    );
    if (index !== -1) {
      updatedAnswerContent.answerContents[index].stepDescription = value;
      setAnswerFormData(updatedAnswerContent);
    }
  };

  return (
    <div style={{ padding: '16px 0' }}>
      <SunEditor
        disable={checkPermissions(['ROLE_SUPER_ADMIN'])}
        height={'300px'}
        onChange={setEditorContent}
        setContents={editorContent} // Set initial content
        placeholder="Enter the content"
        setOptions={{
          formats: ['p', 'blockquote', 'h2'],
          font: ['Arial'],
          defaultStyle: 'font-family: Arial',
          buttonList: [
            [
              'bold',
              'underline',
              'italic',
              'list',
              'align',
              'font',
              'hiliteColor',
              'formatBlock',
              'image',
              'strike',
              'blockquote',
              'link',
              'table',
            ],
          ],
        }}
      />
    </div>
  );
};

export default MyComponent;
