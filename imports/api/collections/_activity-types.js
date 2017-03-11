import { Mongo } from 'meteor/mongo'

Meteor.methods({
  'activityTypes.insert': function (name, type) {
    return ActivityTypes.insert({
      name: name,
      type: type
    })
  }
})

export const ActivityTypes = new Mongo.Collection('activityTypes')
