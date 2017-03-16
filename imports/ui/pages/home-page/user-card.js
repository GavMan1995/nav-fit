import React from 'react'

export default function GroupUserCard(props) {
  let user = props.user
  let group = props.group

  return (
    <div className='c-fit-group__user-container'>
      <img src={user.profile.avatar} />
      <div className='c-fit-group__user-info'>
        <h2>{user.username}</h2>
        <p>Total Steps: {parseInt(user.profile.totalSteps).toLocaleString()}</p>
        <p>Goal Contribution: {Math.ceil(user.profile.totalSteps / group.stepGoal * 100)}%</p>
      </div>
    </div>
  )
}
