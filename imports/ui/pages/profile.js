import React, { Component } from 'react'
import { createContainer } from 'meteor/react-meteor-data'

import { Groups } from '../../api/collections/_groups'
import { Steps } from '../../api/collections/_steps'

class Profile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      profileImage: 'Change Pic'
    }
  }
  render () {
    if (this.props.ready) {
      let user = user = this.props.user
      let groups = this.props.groups
      let steps = this.props.steps
      return (
        <div className='c-fit-profile'>
          <div className='c-fit-profile__info'>
            <div className='c-fit-profile__img'>
              <img src={user.profile.avatar}/>
              <div className='c-profile__change'>
                <input onChange={this.profileImage.bind(this)} type='file'/>
              </div>
            </div>
            <h1>{user.username}</h1>
          </div>

          <div className='c-fit-profile__card'>
            <h1>Your Steps</h1>
            {steps.map((step) => {
              let month = step.createdAt.getMonth()
              let day = step.createdAt.getDate()
              let year = step.createdAt.getFullYear()
              let steps = parseInt(step.steps).toLocaleString()
              return (
                <div className='c-fit-profile__card-info'>
                  <h2>{steps} steps</h2>
                  <h3>{month}/{day}/{year}</h3>
                </div>
              )
            })}
          </div>

          <div className='c-fit-profile__card'>
            <h1>Your Groups</h1>
              {groups.map((group) => {
                let admin = ''
                if (group.owner === Meteor.userId()) {
                  admin = ': Admin'
                }

                return (
                  <div className='c-fit-profile__card-info' key={group.code}>
                    <h3>{group.name}{admin}</h3>
                    <p>code: <a>{group.code}</a></p>
                  </div>
                )
              })}
          </div>
        </div>
      )
    }

    return <div>Loading...</div>
  }

  profileImage (event) {
    console.log(Meteor.settings.public)
    const file = event.target.files[0]
    this.setState({profileImage: 'Loading...'})

    let data = new FormData()
    data.append('file', file)
    data.append('UPLOADCARE_PUB_KEY', Meteor.settings.public.UploadCarePublicId)
    data.append('UPLOADCARE_STORE', '1')

    window.fetch('https://upload.uploadcare.com/base/', {
      method: 'POST',
      body: data
    }).then((res) => {
      if (res.status === 200) return res.json()

      if (res.status === 401) window.location.reload(true)
    }).then((res) => {
      if (!res) return

      if (res.errors && res.errors.length > 0) return

      Meteor.users.update(
        {_id: Meteor.userId()},
        {$set: {"profile.avatar": `https://ucarecdn.com/${res.file}/-/progressive/yes/-/scale_crop/400x400/center/`}}
      )
      this.setState({profileImage: 'Upload Profile Pic'})
      window.location.reload(true)
    }).catch((err) => {
      console.log(err)
    })
  }
}


export default createContainer(() => {
  const groupSub = Meteor.subscribe('groups')
  const stepSub = Meteor.subscribe('steps')

  let ready = false
  if (stepSub.ready() && groupSub.ready()) {
    ready = true
  }

  return {
    ready,
    groups: Groups.find({}).fetch(),
    steps: Steps.find({}).fetch(),
    user: Meteor.user()
  }
}, Profile)
