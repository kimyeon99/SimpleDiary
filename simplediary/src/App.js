import { useEffect, useMemo, useRef, useState } from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';

function App() {

  const [data, setData] = useState([]);

  const dataId = useRef(0);

  const getData = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/comments'
    ).then((res) => res.json());
    
    const initData = res.slice(0, 20).map((i) => {
      return {
        author: i.email,
        content: i.body,
        emotion: Math.floor(Math.random() * 5) + 1,
        created_at: new Date().getTime(),
        id:dataId.current++,
      }
    });
    setData(initData);
  };

  useEffect(() => {
    getData();
  }, []);

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

  const getDiaryAnalysis = useMemo( //memorizing
    () => {
    const goodCount = data.filter((i) => i.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100;

    return {goodCount, badCount, goodRatio};
  }, [data.length] // data.length가 변하지 않는 이상, 리랜더링 하지 않겠다.
  );

  const {goodCount, badCount, goodRatio} = getDiaryAnalysis; // 값을 반환하므로.

  return (
    <div className="App">
      <h2>Diary Web</h2>
      <DiaryEditor onCreate={onCreate}/>
      <div>All Diary : {data.length}</div>
      <div>Good Diary : {goodCount}</div>
      <div>Bad Diary : {badCount}</div>
      <div>Good Diary Ratio : {goodRatio}</div>
      <DiaryList onEdit = {onEdit} onDelete={onDelete} diaryList={data}/>
    </div>
  );
}

export default App;
