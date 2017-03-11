import { Meteor } from 'meteor/meteor'

import { Groups } from '../imports/api/collections/_groups'
import { Steps } from '../imports/api/collections/_steps'

Meteor.startup(() => {
  Meteor.publish('groups', function () {
    return Groups.find({
      users: {
        $elemMatch: { $eq: this.userId }
      }
    })
  })

  Meteor.publish('usersList', function () {
    return Meteor.users.find({})
  })

  Meteor.publish('steps', function () {
    return Steps.find({owner: { $eq: this.userId}})
  })
})
