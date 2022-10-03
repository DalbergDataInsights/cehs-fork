import React, { useRef} from "react";
import { Editor } from "@tinymce/tinymce-react";

const EmailTemplate = ({ body, setTemplate}) => {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  const onChangeEvent = (content) => {
    console.log(editorRef.current.getContent())
    setTemplate(editorRef.current.getContent())
  }

  return (
    <>
      <Editor
        apiKey="fbr0djyshfdkeanj43g203zwii67tjmh5pz7pwhcmct2d11e"
        onInit={(evt, editor) => editorRef.current = editor}
        initialValue={body}
        init={{ 
          height: "100%",
          width: '52vw',
          menubar: true,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image','charmap','preview', 'anchor',
            'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount',
          ],
          toolbar: 'undo redo | formatselect copy paste| ' +
          'bold italic backcolor image| alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent code| ' +
          'removeformat |fullscreen  preview' ,
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:12px }',
          paste_as_text: true,
          placeholder: 'Type here...',
        }}
        onChange = {onChangeEvent}
      />
    </>
  );
}

export default EmailTemplate;
