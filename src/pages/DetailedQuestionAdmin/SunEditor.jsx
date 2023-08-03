import React, { useRef } from "react";
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File

const MyComponent = () => {
    /**
   * @type {React.MutableRefObject<SunEditor>} get type definitions for editor
   */
    const editor = useRef();

    // The sunEditor parameter will be set to the core suneditor instance when this function is called
    const getSunEditorInstance = (sunEditor) => {
        editor.current = sunEditor;
    };

    return (
        <div>
            <SunEditor getSunEditorInstance={getSunEditorInstance} />
        </div>
    );
};
export default MyComponent;
