const Header = ({ name }) => <h1>{name}</h1>

const List = ({ part }) => <p>{part.name} {part.exercises}</p>

const Contents = ({ parts }) => {
  return (
    <>
      {parts.map(part => <List key={part.id} part={part}/>)}
    </>
  )
}

const Total = ({ parts }) => {
  console.log(parts);
  const total = parts.reduce((sum, part) => {
    return sum + part.exercises;
  }, 0);
  return (
    <strong>total of {total} exercises</strong>
  )
}

const Course = ({ course }) => {
  return (
    <>
      <Header name={course.name} />
      <Contents parts={course.parts}/>
      <Total parts={course.parts}/>
    </>
  )
}

export default Course;