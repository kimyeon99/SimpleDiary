import React, { useEffect, useRef, useState } from "react";

const DiaryEditor = ({onCreate}) => {

    const authorInput = useRef();
    const contentInput = useRef();

    const [state, setState] = useState({
        author:"",
        content:"",
        emotion:1
    })

    const handleChangeState = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = () => {
        console.log(state.author.length);
        if(state.author.length < 1){
            // alert("Input author least 1");
            authorInput.current.focus();
            return;
        }
        if(state.content.length < 5){
            // alert("Input content least 5");
            contentInput.current.focus();
            return;
        }
        onCreate(state.author, state.content, state.emotion);
        alert("Save Complete!");
        setState({
            author:"",
            content: "",
            emotion: 1
        })
    }

    return (
    <div className="DiaryEditor">
        <h2>Today's Diary</h2>
        <div>
            <input ref={authorInput} name = "author" value={state.author} onChange= {handleChangeState}/>
        </div>
        <div>
            <textarea name = "content"
                ref={contentInput}
                value={state.content} 
                onChange = {handleChangeState}
                />
        </div>
        <div>
            <span>오늘의 기분은? : </span>
            <select name="emotion" value={state.emotion} onChange={handleChangeState}>
                <option value={1}>Terrible</option>
                <option value={2}>Bad</option>
                <option value={3}>Soso</option>
                <option value={4}>Good</option>
                <option value={5}>Best</option>
            </select>
        </div>

        <div>
            <button onClick={handleSubmit}>Save</button>
        </div>
    </div>
    );
};

export default React.memo(DiaryEditor); 