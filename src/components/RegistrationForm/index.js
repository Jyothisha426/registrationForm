import {Component} from 'react'

import './index.css'

class RegistrationForm extends Component {
  state = {
    firstName: '',
    lastName: '',
    isSuccess: false,
    showFirstNameErr: false,
    showLastNameErr: false,
  }

  onChangeFirstName = event => {
    this.setState({firstName: event.target.value})
  }

  onChangeLastName = event => {
    this.setState({lastName: event.target.value})
  }

  onBlurFirstName = () => {
    const {firstName} = this.state
    const isFirstNameEmpty = firstName === ''
    this.setState({showFirstNameErr: isFirstNameEmpty})
  }

  onBlurLastName = () => {
    const {lastName} = this.state
    const isLastNameEmpty = lastName === ''
    this.setState({showLastNameErr: isLastNameEmpty})
  }

  onSubmitRegistration = event => {
    event.preventDefault()
    const {firstName, lastName} = this.state
    const isFirstNameValid = firstName !== ''
    const isLastNameValid = lastName !== ''
    if (isFirstNameValid && isLastNameValid) {
      this.setState({isSuccess: true})
    } else if (isFirstNameValid && isLastNameValid === false) {
      this.setState({isSuccess: false, showLastNameErr: true})
    } else if (isFirstNameValid === false && isLastNameValid) {
      this.setState({isSuccess: false, showFirstNameErr: true})
    } else {
      this.setState({
        isSuccess: false,
        showFirstNameErr: true,
        showLastNameErr: true,
        firstName: '',
        lastName: '',
      })
    }
  }

  submitAnotherResponse = () => {
    this.setState({
      isSuccess: false,
      showFirstNameErr: false,
      showLastNameErr: false,
      firstName: '',
      lastName: '',
    })
  }

  renderSubmitSuccessForm = () => (
    <div className="success-form">
      <img
        src="https://assets.ccbp.in/frontend/react-js/success-icon-img.png"
        alt="success"
        className="success-img"
      />
      <p className="result-heading">Submitted Successfully</p>
      <div className="submit-btn-container">
        <button
          type="button"
          className="submit-btn"
          onClick={this.submitAnotherResponse}
        >
          Submit Another Response
        </button>
      </div>
    </div>
  )

  render() {
    const {
      isSuccess,
      firstName,
      lastName,
      showFirstNameErr,
      showLastNameErr,
    } = this.state
    const errorBorder1 = showFirstNameErr ? 'error-border' : 'input'
    const errorBorder2 = showLastNameErr ? 'error-border' : 'input'
    return (
      <form className="registration-form" onSubmit={this.onSubmitRegistration}>
        <div>
          <h1 className="heading">Registration</h1>
          {!isSuccess && (
            <div className="registration-sub-container">
              <div className="input-container">
                <label className="label" htmlFor="firstName">
                  FIRST NAME
                </label>
                <input
                  type="text"
                  id="firstName"
                  className={errorBorder1}
                  placeholder="First name"
                  value={firstName}
                  onChange={this.onChangeFirstName}
                  onBlur={this.onBlurFirstName}
                />
                {showFirstNameErr && <p className="required-error">Required</p>}
              </div>
              <div className="input-container">
                <label className="label" htmlFor="secondName">
                  LAST NAME
                </label>
                <input
                  type="text"
                  id="secondName"
                  className={errorBorder2}
                  placeholder="Last name"
                  value={lastName}
                  onChange={this.onChangeLastName}
                  onBlur={this.onBlurLastName}
                />
                {showLastNameErr && <p className="required-error">Required</p>}
              </div>
              <div className="submit-btn-container">
                <button type="submit" className="submit-btn">
                  Submit
                </button>
              </div>
            </div>
          )}
          {isSuccess && this.renderSubmitSuccessForm()}
        </div>
      </form>
    )
  }
}

export default RegistrationForm
