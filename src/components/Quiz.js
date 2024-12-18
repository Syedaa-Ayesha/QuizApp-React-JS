import React, { useRef } from 'react'
import { useState } from 'react';
import { data } from '../Data.js';
export default function Quiz() {
  let [count, setcount] = useState(0);
  const [lock, setlock] = useState(false);
  let [score, setscore] = useState(0);
  const [Result, setResult] = useState(false)
  const option1 = useRef(null);
  const option2 = useRef(null);
  const option3 = useRef(null);
  const option4 = useRef(null);
  let option_arr = [option1, option2, option3, option4]
  const [Question, setQuestion] = useState(data[count]);

  const reviewAns = (e, Ans) => {
    if (lock === false) {
      if (Question.ans === Ans) {
        e.target.classList.add('correct');
        setlock(true);
        setscore(prev => prev + 1);
      }
      else {
        e.target.classList.add('wrong');
        setlock(true);
        option_arr[Question.ans - 1].current.classList.add('correct');
      }
    }
  }
  const next = () => {
    if (lock === true) {
      if (count === data.length - 1) {
        setResult(true);
        return 0;
      }
      setcount(++count);
      setQuestion(data[count]);
      setlock(false);
      option_arr.map((option) => {
        option.current.classList.remove('wrong');
        option.current.classList.remove('correct');
        return null;
      })
    }
  }
  const reset =()=>{
    setlock(false);
    setQuestion(data[0]);
    setscore(0);
    setResult(false)
    setcount(0);
  }
  return (
    <>
      <div className="App">

        <div className="heading">
          <h1>Quiz App <span>HTML, CSS, JS, REACT</span></h1></div>
        <div className="wrapper"></div>
        {Result ? <>
        </> : <>
          <div className='container'>
            <p> <span className="count">{count + 1}. </span>{Question.question}</p>
            <ul className="quizQuestion">
              <li ref={option1} onClick={(e) => { reviewAns(e, 1) }}>{Question.option1}</li>
              <li ref={option2} onClick={(e) => { reviewAns(e, 2) }}>{Question.option2}</li>
              <li ref={option3} onClick={(e) => { reviewAns(e, 3) }}>{Question.option3}</li>
              <li ref={option4} onClick={(e) => { reviewAns(e, 4) }}>{Question.option4}</li>
            </ul>
            <button type="button" onClick={next} >Next</button>
            <div className="questionAttempt">{count + 1} of {data.length} Questions</div>
          </div>
          </>
          }
          {Result ? <><div className="container" style={{display: 'flex' , alignItems:'center',
            justifyContent: 'center' , flexDirection: 'column'}}>
              {score > 8 ? (
<h2 style={{textAlign:'center'}}>You Scored {score} out of {data.length}! "Pass"&#128525;</h2>
) : (
  <h2 style={{textAlign:'center'}}>You Scored {score} out of {data.length}! "Fail"&#128530;</h2>
)}
          
          <button className='btn' onClick={reset}>Reset</button>
          </div></> : <> </>}
         
      </div>
    </>
  )
}
