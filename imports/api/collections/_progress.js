import { Mongo } from 'meteor/mongo'

Meteor.methods({
  'progress.insert': function () {
    return Progress.insert({
      createdAt: new Date(),
      owner: this.userId,
      activity: '',
      type: '',
      metric: null
    })
  }
})

export const Progress = new Mongo.Collection('progress')
