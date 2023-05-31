

const express = require('express')
const app = express()

// importing person model to make mongodb object??
const Person_1 = require('./models/person')

// importing mongo.js module. Not using this probably
const addPerson = require('./mongo')



// accepting request from spesific url
const cors = require('cors');
app.use(cors({
  origin: '*'
}));


// showing frontend when deployed???

app.use(express.static('build'))

// require morgan
const morgan = require('morgan')

// app yse morgan
app.use(morgan('tiny'))



const http = require('http')
const { env } = require('process')


app.use(express.json())





// gets all data form mongoDB Person_1
app.get('/api/persons', (request, response) => {
  console.log('in GET all data from mongoDB db')
  Person_1.find({})
    .then(persons => {
      response.json(persons);
    })
    .catch(error => {
      response.status(500).json({ error: 'An error occurred' });
    });
});

app.get('/hello', (req, res) => {
    
    // fetching date and time
    const date_ob = new Date();
    const personLenght = persons.length
    const text = `Phonebook has info for ${personLenght} people date: ${date_ob}`
    res.json(text)
  })


// getting one person from mongoDB Person_1
app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id;
  Person_1.findById(id)
    .then(person => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).json({ error: 'Person not found' });
      }
    })
    .catch(error => {
      response.status(500).json({ error: 'An error occurred' });
    });
});
   


// DELETE spesific data from mongoDB Person_1
app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id;
  Person_1.findByIdAndRemove(id)
    .then(deletedPerson => {
      if (deletedPerson) {
        response.status(204).end(); // Person successfully deleted
      } else {
        response.status(404).json({ error: 'Person not found' });
      }
    })
    .catch(error => {
      response.status(500).json({ error: 'An error occurred' });
    });
});



// POST
app.post('/', (request, response) => {

  // put request to variable
  const body = request.body

  // if body === undefined
  if (body === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }

  console.log('in post!!!!')
  // new person
  const person = new Person_1({
    name: body.name,
    number: body.number,
  })
  console.log('this is body.name:', body.name)
  console.log('this is body.number:', body.number)

  // showing response of operation if succesfull
  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})






// app port
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})








