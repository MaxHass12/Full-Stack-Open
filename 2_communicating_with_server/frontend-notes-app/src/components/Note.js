const Note = ({ note, toggleImportannce }) => {
  const label = note.important 
    ? 'make not important'
    : 'make important'; 

  return (
    <li className="note">
      {note.content}
      <button onClick={toggleImportannce}>{label}</button>
    </li>
  )
}

export default Note