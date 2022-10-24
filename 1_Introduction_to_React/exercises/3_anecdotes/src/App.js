import { useState } from 'react'

const ANECDOTES = Object.freeze([
  'If it hurts, do it more often.',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
]);

const ANECDOTES_LENGTH = ANECDOTES.length;

const App = () => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(ANECDOTES_LENGTH).fill(0));

  const nextAnecdoteHandler = () => {
    const randomIndex = Math.floor(Math.random() * ANECDOTES_LENGTH);
    setSelected(randomIndex);
  }

  const voteHandler = () => {
    const votesCopy = [...votes];
    votesCopy[selected] += 1;
    setVotes(votesCopy);
  }

  const getMostPopularAnecdote = () => {
    const maxVotes = Math.max(...votes);
    const maxVotesAnecdotesIndex =  votes.indexOf(maxVotes);
    return ANECDOTES[maxVotesAnecdotesIndex];
  }

  return (
    <div>
      <h1>Anecdote of the Day</h1>
      <p>{ANECDOTES[selected]}</p>
      <button onClick={voteHandler}>vote</button>
      <button onClick={nextAnecdoteHandler}>next anecdote</button>
      <h1>Anecdotes with most Votes</h1>
      <p>{getMostPopularAnecdote()}</p>
    </div>
  )
}

export default App
