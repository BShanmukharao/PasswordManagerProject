import './index.css'

const ShowPassword = props => {
  const {passwordDetails, passwordToggle, onDeleteItem} = props
  const {id, websiteName, username, passwrd} = passwordDetails

  const isPassrdShown = passwordToggle ? (
    <p className="userNam"> {passwrd}</p>
  ) : (
    <img
      src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
      alt="stars"
      className="startsPassword"
    />
  )

  const deleteItem = () => {
    onDeleteItem(id)
  }

  return (
    <li className="eachPasswordContainer">
      <p className="userLogo">{websiteName[0].toUpperCase()}</p>
      <div>
        <p className="websname">{websiteName}</p>
        <p className="userNam">{username}</p>
        <div>{isPassrdShown}</div>
      </div>
      <button
        type="button"
        className="buttonContainer"
        onClick={deleteItem}
        data-testid="delete"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="buttonImg"
        />
      </button>
    </li>
  )
}

export default ShowPassword
