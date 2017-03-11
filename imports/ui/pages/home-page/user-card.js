import React from 'react'

export default function GroupUserCard(props) {
  let user = props.user
  let group = props.group

  return (
    <div className='c-fit-group__user-container'>
      <img src={user.profile.avatar} />
      <h2>{user.username}</h2>
      <div className='c-fit-group__user-info'>
        <p>Total Steps: {parseInt(user.profile.totalSteps).toLocaleString()}</p>
        <p>Goal Contribution: {Math.round(user.profile.totalSteps / group.stepGoal * 100)}%</p>
      </div>
    </div>
  )
}
