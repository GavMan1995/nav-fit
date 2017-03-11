import { Mongo } from 'meteor/mongo'

Meteor.methods({
  'metrics.insert': function () {
    return Metrics.insert({
      name: '',
      type: ''
    })
  }
})

export const Metrics = new Mongo.Collection('metrics')
