import React, { Component } from 'react'

export default class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isMember: true
    }
  }
  render () {
    if (this.state.isMember) {
      //Login
      return (
        <div className='c-fit-form-page'>
          <div className='c-fit-login__logo-container'>
            <div className='c-fit-login__logo'>
              <img src='http://res.cloudinary.com/dhucjpszj/image/upload/c_scale,h_40,w_160/v1486494686/NavFit--white.svg'/>
            </div>
          </div>
          <form className='c-fit-form c-fit-form--full-width-input' onSubmit={(event) => this.login(event)}>
            <input ref='loginEmail' placeholder='Email' type='text' required />
            <input ref='loginPassword' placeholder='Password' type='password' required />
            <div className='c-fit-form__btn'>
              <button type='submit' className='c-btn c-btn--xl c-btn--white c-btn--outline'>Login</button>
            </div>
            <p>
              Not a member?
              <a onClick={this.toggleForm.bind(this)}> Sign Up</a>
            </p>
          </form>
        </div>
      )
    } else {
      //signUp
      return (
        <div className='c-fit-form-page'>
          <div className='c-fit-login__logo-container'>
            <div className='c-fit-login__logo'>
              <img src='http://res.cloudinary.com/dhucjpszj/image/upload/c_scale,h_40,w_160/v1486494686/NavFit--white.svg'/>
            </div>
          </div>
          <form className='c-fit-form c-fit-form--full-width-input' onSubmit={(event) => this.signUp(event)}>
            <input ref='email' placeholder='Email' type='email' required />
            <input ref='password' placeholder='Password' type='password' required />
            <input ref='passwordConfirm' placeholder='Confirm Password' type='password' required />
            <input ref='username' placeholder='Username' type='text' required />
            <div className='c-fit-form__file-upload'>
              <label>Upload Profile Pic <span className='fa fa-upload'></span></label>
              <input ref='avatar' placeholder='Profile Pic (url)' type='file'/>
            </div>
            <div className='c-fit-form__btn'>
              <button type='submit' className='c-btn c-btn--xl c-btn--white c-btn--outline'>Sign Up</button>
            </div>
            <p>
              Already a member?
              <a onClick={this.toggleForm.bind(this)}> Login</a>
            </p>
          </form>
        </div>
      )
    }
  }

  toggleForm () {
    this.setState({isMember: !this.state.isMember})
  }

  signUp (event) {
    event.preventDefault()
    let email = this.refs.email.value
    let password = this.refs.password.value
    let passwordConfirm = this.refs.passwordConfirm.value
    let username = this.refs.username.value
    let avatar = 'http://www.communitytech.net/sites/communitytech.schipuldrupal.com/files/imagefield_default_images/default_avatar.png'
    if (this.refs.avatar.value) {
      avatar = this.refs.avatar.value
    }

    if (password != passwordConfirm) {
      alert('The passwords do not match')
    } else {
      Accounts.createUser({
        email,
        password,
        username,
        profile: { selectedGroup: '', totalSteps: 0, avatar }
      }, (err) => {
        if (err) {
          alert(err.message)
        } else {
          window.location.href = 'add-group'
        }
      })
    }
  }

  login (event) {
    event.preventDefault()
    Meteor.loginWithPassword(this.refs.loginEmail.value, this.refs.loginPassword.value, (err) => {
      if (err) {
        alert(err.message)
      } else {
        window.location.href = '/'

      }
    })
  }
}
