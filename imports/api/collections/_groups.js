import { Mongo } from 'meteor/mongo'

Meteor.methods({
  'groups.insert': function (name, code) {
    return Groups.insert({
      createdAt: new Date(),
      owner: this.userId,
      name: name,
      code: code,
      users: [this.userId],
      goals: [],
      challenges: [],
      stepGoal: 0
    })
  },

  'groups.join': function (code, user) {
    return Groups.update({code}, {
      $push: { users: user }
    })
  },

  'groups.addStepGoal': function (code, goal) {
    return Groups.update({ code }, {
        $set: {stepGoal: goal}
    })
  }
})


export const Groups = new Mongo.Collection('groups')
