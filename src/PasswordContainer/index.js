import {v4 as uuidv4} from 'uuid'
import {Component} from 'react'
import ShowPassword from '../ShowPassword'
import './index.css'

class PasswordContainer extends Component {
  state = {
    webSite: '',
    userName: '',
    password: '',
    passwordsList: [],
    isShown: false,
    searchData: '',
  }

  readWebsiteName = event => {
    this.setState({webSite: event.target.value})
  }

  readuserName = event => {
    this.setState({userName: event.target.value})
  }

  readPassword = event => {
    this.setState({password: event.target.value})
  }

  addItem = event => {
    event.preventDefault()
    const {webSite, userName, password} = this.state
    const newItem = {
      id: uuidv4(),
      websiteName: webSite,
      username: userName,
      passwrd: password,
    }
    this.setState(prevState => ({
      passwordsList: [...prevState.passwordsList, newItem],
      webSite: '',
      userName: '',
      password: '',
    }))
  }

  onDeleteItem = id => {
    const {passwordsList} = this.state
    const filterData = passwordsList.filter(Items => id !== Items.id)
    this.setState({passwordsList: filterData})
  }

  renderPasswordContainer = filterDta => {
    const {isShown} = this.state
    return (
      <ul className="passwordsContainer">
        {filterDta.map(eachItem => (
          <ShowPassword
            passwordDetails={eachItem}
            key={eachItem.id}
            passwordToggle={isShown}
            onDeleteItem={this.onDeleteItem}
          />
        ))}
      </ul>
    )
  }

  renderImage = () => (
    <div className="noPasswordsContainer">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
        alt="no passwords"
        className="noPasswordsImage"
      />
      <p className="addPasswordHeading">No Passwords</p>
    </div>
  )

  togglePassword = () => {
    this.setState(prevState => ({isShown: !prevState.isShown}))
  }

  searchData = event => {
    this.setState({searchData: event.target.value})
  }

  render() {
    const {webSite, userName, password, passwordsList, searchData} = this.state
    const filterDta = passwordsList.filter(Items =>
      Items.websiteName.toLowerCase().includes(searchData.toLowerCase()),
    )

    return (
      <div className="bg-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="appLogo"
        />
        <div className="top-container">
          <form className="form-container" onSubmit={this.addItem}>
            <h1 className="addPasswordHeading">Add New Password</h1>
            <div className="eachfiled">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
                className="eachFiledLogo"
              />
              <input
                type="text"
                className="inputSearch"
                onChange={this.readWebsiteName}
                placeholder="Enter Website"
                value={webSite}
              />
            </div>
            <div className="eachfiled">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
                className="eachFiledLogo"
              />
              <input
                type="text"
                className="inputSearch"
                onChange={this.readuserName}
                placeholder="Enter Username"
                value={userName}
              />
            </div>
            <div className="eachfiled">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
                className="eachFiledLogo"
              />
              <input
                type="password"
                className="inputSearch"
                onChange={this.readPassword}
                placeholder="Enter Password"
                value={password}
              />
            </div>
            <div className="buttonContainer">
              <button className="addButton" type="submit" data-testid="delete">
                Add
              </button>
            </div>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
            className="topImageContainer"
          />
        </div>
        <div className="bottom-container">
          <div className="bottom-top-container">
            <div className="bottom-left-container">
              <h1 className="addPasswordHeading">Your Passwords</h1>
              <p className="count-items">{filterDta.length}</p>
            </div>
            <div className="bottom-right-container">
              <div>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                  className="search-icon"
                />
              </div>
              <input
                type="search"
                className="searchiteminput"
                onChange={this.searchData}
                placeholder="Search"
              />
            </div>
          </div>
          <hr />
          <div className="checkbox-container">
            <input
              type="checkbox"
              id="myId"
              className="checkbox"
              onClick={this.togglePassword}
            />
            <label htmlFor="myId" className="showPasswordPara">
              Show Passwords
            </label>
          </div>
          {passwordsList.length !== 0 &&
            this.renderPasswordContainer(filterDta)}
          {passwordsList.length === 0 && this.renderImage()}
        </div>
      </div>
    )
  }
}

export default PasswordContainer
