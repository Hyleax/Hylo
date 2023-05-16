import React, {useState} from 'react'
import ReactQuill from 'react-quill'
// import 'react-quill/dist/quill.snow.css'
import './ReplyTextEditor.css'
import useReply from '../../../hooks/useReply'
import useGetAllPosts from '../../../hooks/useGetAllPosts'
import { postType } from '../../THREAD/SinglePost/Post'
import { replyType } from '../../../context/PostContextProvider'

type replyTextEditorProps = {
  threadID: string | undefined
  setThread: React.Dispatch<React.SetStateAction<postType[]>>
}

const ReplyTextEditor = ({threadID, setThread}: replyTextEditorProps) => {

  
    const [replyTextEditorValue, setReplyTextEditorValue] = useState("")

    const modules = {
        toolbar: [
          [{ 'header': [1, 2, false] }],
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
    

    const handleReplySubmit = async(e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (replyTextEditorValue) {
        const data = await useReply(threadID, replyTextEditorValue)
        setThread(prev => [...prev, data])
      }
      setReplyTextEditorValue("")
      
    }

    return (
        <form 
          onSubmit={(e) => handleReplySubmit(e)}
          className='reply-editor-container'>
            <h3 className='your-answer'>Your Answer</h3>
                <ReactQuill 
                    className='reply-text-editor-quill'
                    theme='snow' 
                    value={replyTextEditorValue} 
                    onChange={setReplyTextEditorValue}
                    modules={modules}
                    formats={formats}
                    placeholder='Enter your reply here'
                    />
                <button className='reply-btn'>Reply</button>
        </form>
    )
}

export default ReplyTextEditor