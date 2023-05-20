import React, {useState, useRef} from 'react'
import './Postform.css'
import PostTextEditor from '../../TextEditor/PostTextEditor/PostTextEditor'
import usePost from '../../../hooks/usePost'
import { useNavigate } from 'react-router-dom'
import useGetAllPosts from '../../../hooks/useGetAllPosts'

const PostForm = () => {
    
    //post form input state
    const [title, setTitle] = useState("")
    const [category, setCategory] = useState("")
    const [textEditorValue, setTextEditorValue] = useState('')
    const msgRef = useRef<HTMLSpanElement>(null)

   
    const navigate = useNavigate()
    const { setAllPostsAndReplies } = useGetAllPosts()

    const handleFormSubmit = async(e:  React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // custom hook to send post creation data to backend
        const data = await usePost({title, category, textEditorValue});
        if (data) {
            if (msgRef.current != null) {
                msgRef.current.style.visibility = 'visible' 

                setAllPostsAndReplies(prev => [...prev, data.post])
                // open to page containing the fresh thread and post
                navigate(`../view/${data.post.threadID}`)
            }
           
        }
    }

    return (
    <>
        <form className='post-form' onSubmit={(e) => handleFormSubmit(e)}>
            <h1 className='post-form-header'>Post a new Thread</h1>

            <div className="post-form-input">
                <input 
                    required
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    type="text" 
                    placeholder='Please enter the title of your post...'/>
            </div>

            <div className="post-form-input">
                <select 
                    required
                    onChange={(e) => setCategory(e.target.value)}
                    value={category}
                    >
                    <option value="" disabled>Select Category...</option>
                    <option value="General">General</option>
                    <option value="Lectures">Lectures</option>
                    <option value="Practicals">Practicals</option>
                    <option value="Quizzes">Quizzes</option>
                    <option value="Assignments">Assignments</option>
                    <option value="Final Exam">Final Exam</option>
                </select>
            </div>
            
            <div className="post-form-input">
                <p><i>Please provide details like content, intent, and examples</i></p>
                <PostTextEditor 
                    setTextEditorValue={setTextEditorValue}
                    textEditorValue = {textEditorValue}
                    />
            </div>
            <span ref={msgRef} className='data-message'>Creating Post...</span>
            <div className="post-form-input">
                <button className='post-btn'>Create Post</button>
            </div>
        </form>
    </>
  )
}

export default PostForm