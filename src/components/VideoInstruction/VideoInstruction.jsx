import React from "react";
import Input from "../Input/Input.jsx";
import ReactPlayer from "react-player";
export const VideoInstruction = ({answerFormData, setAnswerFormData, selectedLanguage}) => {
    const selectedLanguageItem = answerFormData.answerContents?.find(item => item.langKey === selectedLanguage);

    const handleChangeInput = (name,value) => {
        const updatedAnswerContent = { ...answerFormData };
        const index = answerFormData?.answerContents.findIndex(content => content.langKey === selectedLanguage);

        if (index !== -1) {
            updatedAnswerContent.answerContents[index][name] = value;
            setAnswerFormData(updatedAnswerContent);
        }
    }

    return (
        <div>
            <Input style={{margin: '8px 0'}} placeholder={'Video url'} value={selectedLanguageItem?.videoUrl}
                   onChange={e=>handleChangeInput('videoUrl',e.target.value)} />
            {selectedLanguageItem?.videoUrl && <ReactPlayer url={selectedLanguageItem?.videoUrl} />}
            <Input style={{margin: '8px 0'}} placeholder={'Video description'}  value={selectedLanguageItem?.videoDescription}
                   onChange={e=>handleChangeInput('videoDescription',e.target.value)}/>
        </div>
    )
}