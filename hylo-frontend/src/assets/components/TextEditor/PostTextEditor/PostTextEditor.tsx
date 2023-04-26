import React, {useState} from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import './PostTextEditor.css'

// text editor component for making a new post

type textEditorValueProps = {
  setTextEditorValue : React.Dispatch<React.SetStateAction<string>>
  textEditorValue: string
}

const PostTextEditor = ({setTextEditorValue, textEditorValue}: textEditorValueProps) => {
    

    const modules = {
        toolbar: [
          [{ 'header': [1, 2, 3, 4, 5,6, false] }],
          ['bold', 'italic', 'underline','strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
          ['link', 'image'],
          ['clean']
        ],
      }
    
    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
      ]
    

    return (
        <>
            <ReactQuill 
                placeholder='Start typing here'
                className='post-text-editor'
                theme='snow' 
                value={textEditorValue} 
                onChange={setTextEditorValue}
                modules={modules}
                formats={formats}
                />
        </>
  )
}

export default PostTextEditor