import React from 'react'

export default function CurrentUserCard(props) {
  let group = props.group
  let thisUser = Meteor.users.findOne(Meteor.userId())

  return (
    <a href='/profile' className='c-fit-group__user-container c-fit-group__user-container--link'>
      <img src={thisUser.profile.avatar} />
      <div className='c-fit-group__user-info c-fit-group__user-info--current'>
        <h2>{thisUser.username}</h2>
        <p>Total Steps: {parseInt(thisUser.profile.totalSteps).toLocaleString()}</p>
        <p>Goal Contribution: {Math.ceil(thisUser.profile.totalSteps / group.stepGoal * 100)}%</p>
      </div>
    </a>
  )
}
