// 1

// const Part = (props) => {
//   return (
//     <p>
//     {props.name} {props.exercises}
//     </p>
//   )
// }

// const Header = (props) => {
//   return (
//     <h1>{props.course}</h1>
//   )
// }

// const Content = (props) => {
//   return (
//     <>
//       <Part name={props.parts[0].name} exercises={props.parts[0].exercises}/>
//       <Part name={props.parts[1].name} exercises={props.parts[1].exercises}/>
//       <Part name={props.parts[2].name} exercises={props.parts[2].exercises}/>
//     </>
//   )
// }

// const Total = (props) => {
//   return (
//     <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
//   )
// }

// const App = () => {
//   const course = {
//     name: 'Half Stack application development',
//     parts: [
//     {
//       name: 'Fundamentals of React',
//       exercises: 10
//     },
//     {
//       name: 'Using props to pass data',
//       exercises: 7
//     },
//     {
//       name: 'State of a component',
//       exercises: 14,
//     }
//   ]};

//   return (
//     <div>
//       <Header course={course.name} />
//       <Content parts={course.parts} />
//       <Total parts={course.parts}/>
//     </div>
//   )
// }

// 2

// const Hello = ({name, age}) => {
//   const bornYear = () => new Date().getFullYear() - age;
  
//   return (
//     <div>
//       <p>Hello {name}, you are {age} years old</p>
//       <p>So you were probably born in {bornYear()}</p>
//     </div>
//   )
// }

// const App = () => {
//   const name = 'Peter';
//   const age = 10;

//   return (
//     <div>
//       <h1>Greetings</h1>
//       <Hello name="Maya" age={26 + 10}/>
//       <Hello name={name} age={age}/>
//     </div>
//   )
// }

// import { useState } from 'react'

// const Display = ({counter}) => <div>{counter}</div>;


// const Button = ({onClick, text}) => {
//   return (
//     <button onClick={onClick}>
//       {text}
//     </button>
//   )
// }

// const App = () => {
//   const [ counter, setCounter ] = useState(0);

//   const plusOne = () => setCounter(counter + 1);
//   const minusOne = () => setCounter(counter - 1);
//   const reset = () => setCounter(0);

//   return (
//     <div>
//       <Display counter={counter}/>
//       <Button onClick={plusOne} text={"plus"}/>
//       <Button onClick={minusOne} text={"minus"}/>
//       <Button onClick={reset} text={"reset"}/>
//     </div>
//   ) 
// }

// 4

import { useState } from 'react'

const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>the app is used by pressing buttons</div>
    )
  }
  return (
    <div>button press history: {props.allClicks.join(' ')}</div>
  )
}

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const App = () => {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const [allClicks, setAll] = useState([]);

  const increaseLeft = () => {
    setAll(allClicks.concat('L'));
    setLeft(left + 1);
  }

  const increaseRight = () => {
    setAll(allClicks.concat('R'));
    setRight(right + 1);
  }

  // debugger;

  // const [clicks, setClicks] = useState({
  //   left: 0, right: 0
  // });

  // const increaseLeft = () => {
  //   const newClicks = {
  //     ...clicks,
  //     left: clicks.left + 1,
  //   }
  //   setClicks(newClicks);
  // }

  // const increaseRight = () => {
  //   const newClicks = {
  //     ...clicks,
  //     right: clicks.right + 1
  //   }
  //   setClicks(newClicks);
  // }

  return (
    <div>
      {left}
      <Button handleClick={increaseLeft} text={"left"}/>
      <Button handleClick={increaseRight} text={"right"}/>
      {right}
      <History allClicks={allClicks}/>
    </div>
  )
}

export default App
