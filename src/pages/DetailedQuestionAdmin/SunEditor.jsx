import React, { useState, useEffect } from 'react';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';

const MyComponent = ({
  answerFormData,
  setAnswerFormData,
  selectedLanguage
}) => {
  const selectedLanguageItem = answerFormData.answerContents?.find(
    (item) => item.langKey === selectedLanguage
  );

  const [editorContent, setEditorContent] = useState(
    selectedLanguageItem?.stepDescription || ''
  );
  useEffect(() => {
    handleContentChange(editorContent);
  }, [editorContent]);

  useEffect(() => {
    console.log(selectedLanguageItem)
    setEditorContent(selectedLanguageItem?.stepDescription);
  }, [answerFormData]);

  const handleContentChange = (value) => {
    const updatedAnswerContent = { ...answerFormData };
    const index = answerFormData?.answerContents.findIndex(
      (content) => content.langKey === selectedLanguage
    );
    if (index !== -1) {
      updatedAnswerContent.answerContents[index].stepDescription = value;
      setAnswerFormData(updatedAnswerContent);
    }
  };

  return (
    <div style={{ padding: '16px 0' }}>
      <SunEditor
        height={'300px'}
        onChange={setEditorContent}
        setContents={editorContent} // Set initial content
        placeholder="Enter the content"
        setOptions={{
          buttonList: [
            [
              'bold',
              'underline',
              'italic',
              'list',
              'align',
              'font',
              'fontSize',
              'hiliteColor',
              'formatBlock',
              'image',
              'strike',
              'blockquote'
            ]
          ]
        }}
      />
    </div>
  );
};

export default MyComponent;
