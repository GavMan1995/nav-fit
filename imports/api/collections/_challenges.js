import { Mongo } from 'meteor/mongo'

Meteor.methods({
  'challenges.insert': function () {
    return Challenges.insert({
      createdAt: new Date(),
      owner: this.userId,
      name: '',
      type: '',
      metric: null,
      users: [],
      progress: []
    })
  }
})


export const Challenges = new Mongo.Collection('challenges')
