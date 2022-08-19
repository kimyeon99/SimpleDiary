import { useRef, useState } from "react";

const DiaryItem = ({onEdit, onDelete, author, content, created_at, emotion, id}) => {

    const [isEdit, setIsEdit] = useState(false);
    const toggleIsEdit = () => setIsEdit(!isEdit);

    const [localContent, setLocalContent] = useState(content);
    const localContentInput = useRef();

    const handleDelete = () => {
        if(window.confirm(`Are you sure delete this post?`)){
            onDelete(id);
        }
    }

    const handleEdit = () => {
        if(localContent.length < 5){
            localContentInput.current.focus();
            return;
        }

        if(window.confirm(`Do you want Edit this post?`)){
            onEdit(id, localContent);
            toggleIsEdit();
        }
    }

    const handleCancleEdit = () => {
        setIsEdit(false);
        setLocalContent(content);
    }

    return (<div className="DiaryItem">
    <div className="info">
        <span>author: {author} | emotion: {emotion}</span>
        <br/>
        <span className="date">{new Date(created_at).toLocaleString()}</span>
    </div>
    <div className="content">
        {isEdit ? (
        <>
            <textarea ref={localContentInput} value={localContent} onChange={(e)=>{setLocalContent(e.target.value)}}/>
        </>) : (
         <>{content}</>
         )}
    </div>

    {isEdit ? <>
        <button onClick={handleCancleEdit}>Cancle</button>
        <button onClick={handleEdit}>Done</button>
    </> : 
    <>
        <button onClick={handleDelete}>Delete</button>
        <button onClick={toggleIsEdit}>Edit</button>
    </>}

    </div>)
};

export default DiaryItem;