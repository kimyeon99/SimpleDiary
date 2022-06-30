import DiaryItem from "./DiaryItem";

const DiaryList = ({ onEdit, onDelete, diaryList}) => {
    return (
        <div className="DiaryList">
            <h2>List</h2>
            <h4>{diaryList.length}</h4>
        <div>
            {diaryList.map((it)=> (
                <DiaryItem key={it.id} {...it} onDelete={onDelete} onEdit={onEdit} />
            ))}
        </div>
        </div>
    );
};

DiaryList.defaultProps={
    diaryList:[]
}

export default DiaryList;