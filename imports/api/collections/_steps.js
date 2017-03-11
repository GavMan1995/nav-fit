import { Mongo } from 'meteor/mongo'

Meteor.methods({
  'steps.insert': function (steps) {
    return Steps.insert({
      createdAt: new Date(),
      owner: this.userId,
      steps
    })
  }
})

export const Steps = new Mongo.Collection('steps')
