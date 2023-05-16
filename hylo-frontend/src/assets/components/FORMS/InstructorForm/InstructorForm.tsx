import React, { useState, useRef } from 'react'
import './InstructorForm.css'
import { FileUploader } from 'react-drag-drop-files'
import useApplyInstructor from '../../../hooks/useApplyInstructor';

const fileTypes = ["JPG", "PDF", "DOC", "PNG"];

const InstructorForm = () => {

    const [file, setFile] = useState<File[]>([])
    const containerRef = useRef<HTMLDivElement>(null)
    const msgRef = useRef<HTMLParagraphElement>(null)

    const handleFile = (newFile: any) => {
        setFile(newFile)
    }
    
    // very dumb react library
    // doesn't allow for .map() zzzz
    const fileNames = []

    for (let i =0; i < file.length; i++) {
        if (file.length > 0) {
            fileNames.push(file[i].name)
        }
    }

    const fileNameElements = fileNames.map((fn, index) =>(
        <p key={index} className='filename-element'>{fn}</p>
    ))

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        // write custom hook to subimt documents
        const data = await useApplyInstructor(file)
        
        if (data){
            if (msgRef.current) {
                msgRef.current.style.visibility = 'visible'
            }
            setTimeout(() => {
                if (msgRef.current) {
                    msgRef.current.style.visibility = 'hidden'
                }
            }, 5000)
        }

    }

    return (
        <form 
            onSubmit={(e) => handleSubmit(e)}
            className='instructor-outer-form' 
            encType='multipart/form-data'>

                <h1>Instructor Application</h1>

                <textarea 
                    required
                    className='instructor-textarea'  
                    cols={60} 
                    rows= {10} 
                    placeholder='Why do you want to become an instructor...'>
                </textarea>

                <p><b>Uploaded Files: {file.length}</b></p>

                <div 
                    className='files-container'
                    ref={containerRef}
                    >   
                        {
                            file && fileNameElements
                        }
                </div>

                <FileUploader 
                    classes= "file-uploader"
                    multiple={true}
                    handleChange={handleFile}
                    name = "file"
                    types = {fileTypes}   
                    label = "Upload your academic qualifications here" 
                    required
                    fileOrFiles
                />

                <button className='instructor-apply-btn'>Apply</button>

                <p ref={msgRef} className='upload-files-success-msg'>Files Successfully uploaded!<br /> Refresh the browser and <br /> enjoy your new priviliges😊</p>
        </form>
    )
}

export default InstructorForm