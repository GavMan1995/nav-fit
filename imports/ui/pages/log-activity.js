import React, { Component } from 'react'
import { Steps } from '../../api/collections/_steps'

export default class LogActivity extends Component {

  render () {
    return (
      <div className='c-fit-form-page'>
        <form className='c-fit-form'>
          <h1>Log Activity</h1>
          <select name='activityType' required>
            <option>Run</option>
            <option>Walk</option>
            <option>Cycle</option>
            <option>Swim</option>
            <option>General</option>
          </select>
          <input type='text' placeholder='Duration (min)' required/>
          <input type='text' placeholder='Distance (miles)'/>
          <input type='text' placeholder='Elevation (ft)' />
          <input type='text' placeholder='Calories Burned' />
          <div className='c-fit-form__btn'>
            <button className='c-btn c-btn--xl c-btn--white c-btn--outline'>Add Activity</button>
          </div>
        </form>

        <h1 className='c-fit-form-page__spacer'>~ OR ~</h1>

        <form className='c-fit-form' onSubmit={this.addSteps.bind(this)}>
          <h1>Log Steps</h1>
          <input type='number' placeholder='Steps' ref='steps'/>
          <div className='c-fit-form__btn'>
            <button className='c-btn c-btn--xl c-btn--white c-btn--outline'>Add Steps</button>
          </div>
        </form>
      </div>
    )
  }

  addSteps(event) {
    event.preventDefault()
    let steps = parseInt(this.refs.steps.value)
    Meteor.call('steps.insert', steps)
    Meteor.users.update(
      {_id: Meteor.userId()},
      {$inc: {"profile.totalSteps": steps}}
    )
    alert('Great Job on your achievement! :)')
  }
}
