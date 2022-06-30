import { useRef, useState } from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';

function App() {

  const [data, setData] = useState([]);

  const dataId = useRef(0);

  const onCreate = (author, content, emotion) => {
    const created_at = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_at,
      id: dataId.current
    }
    dataId.current += 1;
    setData([newItem, ...data]);
  }

  const onDelete = (targetId) => {
    console.log(`${targetId} deleted`)
    const newDiaryList = data.filter((it)=>it.id !== targetId);
    setData(newDiaryList);
  }

  const onEdit = (targetId, newContent) => {
    setData(
      data.map((it) => it.id === targetId ? {...it, content:newContent} : it)
    );
  }

  return (
    <div className="App">
      <h2>Diary Web</h2>
      <DiaryEditor onCreate={onCreate}/>
      <DiaryList onEdit = {onEdit} onDelete={onDelete} diaryList={data}/>
    </div>
  );
}

export default App;
