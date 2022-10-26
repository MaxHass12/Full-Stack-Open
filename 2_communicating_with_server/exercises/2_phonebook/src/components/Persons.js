const DisplaySingleContact = ({ person }) => {
  return <p>{person.name} {person.number}</p>
}

const Persons = ({ persons, searchText} ) => {
  if (searchText.trim() !== '') {
    searchText = searchText.trim().toLowerCase();
    console.log(searchText);
    persons = persons.filter(person => person.name.toLowerCase().startsWith(searchText));
  }
  
  return (
    <>
      {
        persons.map(person => {
          return <DisplaySingleContact key={person.name} person={person}/>;
        })
      }
    </>
  )
};

export default Persons;