const DisplaySingleContact = ({ person, deleteContact }) => {
  return (
          <p>
            {person.name} {person.number}
            <button onClick={() => {deleteContact(person.name)}}>delete</button>
          </p>
         )
}

const Persons = ({ persons, searchText, deleteContact} ) => {
  if (searchText.trim() !== '') {
    searchText = searchText.trim().toLowerCase();
    console.log(searchText);
    persons = persons.filter(person => person.name.toLowerCase().startsWith(searchText));
  }
  
  return (
    <>
      {
        persons.map(person => {
          return <DisplaySingleContact key={person.name} person={person} deleteContact={deleteContact}/>;
        })
      }
    </>
  )
};

export default Persons;