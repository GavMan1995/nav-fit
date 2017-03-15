
import React, { Component } from 'react'
import { createContainer } from 'meteor/react-meteor-data'

import { Groups } from '../../../api/collections/_groups'

import GroupHeader from './group-header'
import UserCard from './user-card'
import CurrentUserCard from './current-user-card'

class HomePage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      formOpen: false
    }
  }

  render () {

    if(!this.props.group && this.props.ready) {
      return <h1>No group seleted</h1>
    }

    if (this.props.ready) {
      let group = this.props.group
      let users = Meteor.users.find({_id: {$in: group.users}}).fetch()
      let userSteps = 0
      users.map((user) => userSteps += user.profile.totalSteps)

      return (
        <div className='c-fit-group'>
          <GroupHeader group={group} userSteps={userSteps}/>

          <CurrentUserCard group={group}/>

          {users.map((user, index) => {
            if (user._id !== Meteor.userId()) {
              return <UserCard group={group} user={user} key={index}/>
            }
          })}
        </div>
      )
    }

    return <div>Loading...</div>
  }
}

export default createContainer((props) => {
  let user = Meteor.users.findOne(Meteor.userId())
  let sub = Meteor.subscribe('groups')

  Meteor.subscribe('usersList')

  if (user) {
    let code = user.profile.selectedGroup
    let group = Groups.findOne({code})
    return {
      ready: sub.ready(),
      group: group
    }
  }

  return {}
}, HomePage)
