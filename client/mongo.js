
const express = require('express')

const app = express()

const mongoose = require('mongoose')


// setting someting
mongoose.set('strictQuery', false)


// connecting to database
mongoose.connect('mongodb+srv://MrRobotss252525:heihei123@fullstackopen.zz8a87y.mongodb.net/noteApp?retryWrites=true&w=majority')
console.log('database connected succesfully!!!')


// making schema
const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

// model for schema?
const Person = mongoose.model('Person', personSchema)



// making function that gets parameter and makes it a personObject
const personMaker = (command, password, name, number) => {
  if (command === 'node mongo.js' && password === 'heihei123') {
    // making object
    const person = new Person({
      name: name,
      number: number,

    })
    console.log('in mongodb????')

    // logging notes from database
    Person.find({}).then(result => {
      result.forEach(person => {
        console.log(person)
      })
      mongoose.connection.close()
    })

    person.save().then(result => {
    console.log('person saved!')
    mongoose.connection.close()
    })
  }

  else console.log('password or command incorrect')

}

// testing personMaker function with hardcoding
// personMaker('hey', 'hey', 'jaakko', '123')


// exporting function
module.exports = personMaker











