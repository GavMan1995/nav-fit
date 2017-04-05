import React, { Component } from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import { Groups } from '../../api/collections/_groups'

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false
    }
  }

  render() {
    if (this.props.ready) {
      let groups = this.props.groups
      let group = this.props.group
      return (
        <div className='c-fit-navbar'>
          <div className='c-fit-navbar__logo'>
            <a href='/'>
              <img
                src='http://res.cloudinary.com/dhucjpszj/image/upload/c_scale,h_40,w_160/v1486494686/NavFit.svg'
                alt='http://res.cloudinary.com/dhucjpszj/image/upload/c_scale,h_40,w_160/v1486494686/NavFit.svg' />
            </a>
            <h3>beta</h3>
          </div>

          <div className='c-fit-navbar__navigation'>
            <div className='c-fit-select'>
              <button
                onClick={this.toggleDropdown.bind(this)}
                className='c-btn c-btn--lg c-btn--outline c-btn--white c-btn--fit-select'>
                {group ? group.name : 'no group selected'} &#8681;
              </button>
              <div className={`c-fit-select__options ${this.state.isOpen ? 'is-open' : ''}`}>
                {groups.map((g) => {
                  return (
                    <p key={g.code} onClick={() => this.selectGroup(g.code)}>
                      {g.name}
                    </p>
                  )
                })}
                <a href='add-group'><p>Add Group</p></a>
              </div>
            </div>
            <a href='log-activity'>Log Activity</a>
            <a href='profile'>Profile</a>
            <a onClick={this.signOut.bind(this)}>Signout</a>
          </div>
        </div>
      )
    }

    return <div></div>
  }

  toggleDropdown () {
    this.setState({isOpen: !this.state.isOpen})
  }

  signOut () {
    Meteor.logout(() => {
      window.location.href = '/'
    })
  }

  selectGroup (code) {
    this.setState({isOpen: false})
    Meteor.users.update(
      {_id: Meteor.userId()},
      {$set: {"profile.selectedGroup": code}}
    )
  }
}

export default createContainer((props) => {
  let subs = Meteor.subscribe('groups')

  if(subs.ready()) {
    let code = Meteor.user().profile.selectedGroup
    return {
      ready: subs.ready(),
      group: Groups.findOne({code}),
      groups: Groups.find({}).fetch()
    }
  }

  return {}
}, Header)
