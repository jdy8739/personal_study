import react, { useEffect, useState } from 'react';

function AgeCalculator() {

    let [count, setCount] = useState(0);
    let [age, setAge] = useState(20);

    function plusAge() {
        setCount(count + 1); //useState의 변경함수는 무조건 비동기로 실행됨. 밑의 코드가 먼저 실행된다는 뜻.
    };

    useEffect(() => {
        if(count !== 0 && count < 3) {
            setAge(age + 1); //처음 컴포넌트 로드 시에 무조건 useEffect가 발동하는 현상이 있다. 로직을 짜주거나 구글링해서 커스텀 코드를 갖다주면됨.
        }
    }, [ count ]); 

    return (
        <>
            <div>
                <div>안녕하십니까 전 {age}</div>
                <button onClick={ plusAge }>누르면한살먹기</button>
                <div>누른 횟수 {count}</div>
            </div>
        </>
    )
}

export default AgeCalculator;