import { Mongo } from 'meteor/mongo'

Meteor.methods({
  'activities.insert': function (type, metric) {
    return Activities.insert({
      createdAt: new Date(),
      owner: this.userId,
      type: type,
      metric: metric
    })
  }
})

export const Activities = new Mongo.Collection('activites')
