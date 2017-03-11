import React, {Component} from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import keygen from 'keygen'

import { Groups } from '../../api/collections/_groups'

class AddGroup extends Component {
  render() {
    if(this.props.ready) {
      return (
        <div className='c-fit-form-page'>
          <form className='c-fit-form' onSubmit={this.joinGroup.bind(this)}>
            <h1>Join a group.</h1>
            <input ref='groupCode' placeholder='Group Code' type='text' required />
            <div className='c-fit-form__btn'>
              <button type='submit' className='c-btn c-btn--xl c-btn--white c-btn--outline'>Join Group</button>
            </div>
          </form>

          <h1 className='c-fit-form-page__spacer'>~ OR ~</h1>

          <form className='c-fit-form' onSubmit={this.createGroup.bind(this)}>
            <h1>Create a group.</h1>
            <input ref='groupName' placeholder='Group name' type='text' required />
            <div className='c-fit-form__btn'>
              <button type='submit' className='c-btn c-btn--xl c-btn--white c-btn--outline'>Create Group</button>
            </div>
          </form>
        </div>
      )
    }
    return <div>Loading...</div>
  }

  createGroup(event) {
    event.preventDefault()

    const code = keygen.url()
    const name = this.refs.groupName.value
    Meteor.call('groups.insert', name, code)
    window.location.href = '/'
    selectGroup(code)
  }

  joinGroup(event) {
    event.preventDefault()

    const code = this.refs.groupCode.value
    let duplicate = false
    this.props.groups.map((group) => {
      if (group.users.includes(code)) {
        duplicate = true
      }
    })

    if (duplicate) {
      alert('Already Joined')
    } else {
      Meteor.call('groups.join', code, Meteor.userId())
      window.location.href = '/'
      selectGroup(code)
    }
  }
}

function selectGroup(code) {
  Meteor.users.update(
    {_id: Meteor.userId()},
    {$set: {"profile.selectedGroup": code}}
  )
}

export default createContainer(() => {
  let groupsSub = Meteor.subscribe('groups')

  return {
    ready: groupsSub.ready(),
    groups: Groups.find({}).fetch(),
    user: Meteor.user()
  }
}, AddGroup)
