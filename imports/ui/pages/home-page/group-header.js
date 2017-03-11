import React, { Component } from 'react'

import { Groups } from '../../../api/collections/_groups'

export default class GroupHeader extends Component {
  constructor(props) {
    super(props)

    this.state = {
      formOpen: false
    }
  }

  render () {
    const group = this.props.group
    const userSteps = this.props.userSteps

    let goalForm
    let addButton
    if(group.owner === Meteor.userId()) {
      goalForm = (
        <form
          className={`c-fit-form c-fit-form--full-width-input ${this.state.formOpen ? '' : 'hidden'}`}
          onSubmit={this.addGroupStepGoal.bind(this, group)}>
          <p
            className='fa fa-times-circle c-fit-form__cancel'
            onClick={this.toggleGoalForm.bind(this)}></p>
          <h1>Add Group Goal</h1>
          <input placeholder='add step goal' ref='goal' />
          <button className='c-btn c-btn--white c-btn--outline c-btn--lg'>Add Goal</button>
        </form>
      )

      addButton = (
        <p
          className='fa fa-plus-square'
          onClick={this.toggleGoalForm.bind(this)}>
        </p>
      )
    }

    return (
      <div className='c-fit-group__header'>
        <h1>{group.name}</h1>
        <h3>Step Goal: {parseInt(group.stepGoal).toLocaleString()}</h3>
        <h3>Steps Taken: {userSteps.toLocaleString()} ({Math.round(userSteps / group.stepGoal * 100)}%)</h3>
        <div className='c-fit-group__header-actions'>
          <a
            className='fa fa-share-square'
            href={`mailto:email@example.com?subject=Come Join My Group&body=${group.code}`}></a>
          {addButton}
        </div>

        {goalForm}
      </div>
    )
  }

  toggleGoalForm() {
    this.setState({formOpen: !this.state.formOpen})
  }

  addGroupStepGoal(group, event) {
    event.preventDefault()
    let goal = this.refs.goal.value
    let code = group.code
    Meteor.call('groups.addStepGoal', code, goal)
    this.setState({formOpen: false})
  }
}
