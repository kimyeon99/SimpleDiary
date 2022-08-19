import React, { useEffect, useState } from "react";

const CounterA = React.memo(({count})=>{
    useEffect(()=>{
        console.log("counterA" + count);
    });
    return <div>{count}</div>
})

const CounterB = React.memo(({obj})=>{
    useEffect(()=>{
        console.log("counterB" + obj);
    });
    return <div>{obj.count}</div>
});

const areEqual = (prevProps, nextProps)=>{
    return prevProps.obj.count === nextProps.obj.count ? true : false;
    // trun = 이전과 현재 프롭스가 같음 -> 리렌더링 x
    // false = 이전과 현재 프롭스가 다름 -> 리렌더링 o
}

const MemoizedCounterB = React.memo(CounterB.areEqual);

const OptimizeTest = () => {

    const [count, setCount] = useState(1);
    const [obj, setObj] = useState({
        count:1
    })

    return (
    <div style={{padding:50}}>
        <div>
            <h2>counter a</h2>
            <CounterA count={count}></CounterA>
            <button onClick={() => setCount(count)}>A button</button>
        </div>
        <div>
            <h2>counter b</h2>
            <MemoizedCounterB obj={obj}></MemoizedCounterB>
            <button Click={() => setObj({
                count: obj.count
            })}>B button</button>
        </div>
    </div>
    );
}

export default OptimizeTest;