const Filter = ({ searchText, handler }) => {
  return (
    <div>
      filter shown with <input onChange={handler} value={searchText}/>
    </div>
  )
}

export default Filter;