const Notification = ({ message, isSuccess }) => {
  const successStyle = {
    color: 'green',
    backgroundColor: 'lightgrey',
    padding: 10,
    border: '2px solid black',
    borderRadius: 5,
    margin: 10,
  }

  const errorStyle = {
    backgroundColor: 'red',
    padding: 10,
    border: '2px solid red',
    borderRadius: 5,
    margin: 10,
  }

  const notificationStyle = isSuccess ? successStyle : errorStyle;

  if (message === null) {return;}

  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

export default Notification;