//nodemon
//environment variables.
const Joi = require('joi'); //returns a class.
const express = require('express');
const app = express();
app.use(express.json()); //express.json returns a piece of middleware
// and call app.use() to use that middleware into request processing pipeline.

const courses = [{
    "id": 1,
    "name": "abc"
  },
  {
    "id": 2,
    "name": "def"
  },
  {
    "id": 3,
    "name": "ghi"
  },
  {
    "id": 4,
    "name": "jkl"
  }
];
//root , callback function with 2 arguments
app.get('/', (req, res) => {
  res.send('hello afrin!! welcome!!');
});
// app.post();
// app.put();
// app.delete();

app.get('/api/courses', (req, res) => {
  res.send(courses);
});

app.get('/api/posts/:mon/:year/:m', (req, res) => {
  res.send(req.params);
});
//http://localhost:3000/api/posts/2/2018?sortBy=name
// reading query string params
app.get('/api/posts/:mon/:year', (req, res) => {
  res.send(req.query);
});

//handling GET response
//let - wanna reset later
//const -not gonna change later.

app.get('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course)  return res.status(404).send('The course with the given ID is not found');//404 - NOT FOUND
  res.send(course);
});

//post requests and validating
app.post('/api/courses', (req, res) => {
  const schema = {
    name: Joi.string().min(3).required()
  };
  const result = Joi.validate(req.body, schema); // returns an object
  console.log(result);
  //see the screenshot of postman
  if (result.error) return res.status(400).send(result.error.details[0].message);
  //validations of request body

  //see the cmd validation screeshot for the result
  if (!req.body.name || req.body.name.length < 3) {
    //400  Bad Request
    return res.status(400).send('Name is required and should be minimum 3 characters');

  }
  const course = {
    id: courses.length + 1,
    name: req.body.name // we need to enable parsing of json body
  };
  courses.push(course); //add that in server
  res.send(course); //return this to the client as client needs to know its id.
});

//put route handler
app.put('/api/courses/:id', (req, res) => {
  //Look up the courses
  //if not exist - returns 404
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(400).send('The given course Id is not found');

  //validate
  // const result = validateCourse(req.body);
  //object destructuring
  const {
    error
  } = validateCourse(req.body); //equivalent to result.error

  //if invalid, return 400 - Bad request

  if (error) return res.status(400).send(error.details[0].message);

  //update the course
  course.name = req.body.name;

  //return the updated course
  res.send(course);
});

function validateCourse(course) {
  const schema = {
    name: Joi.string().min(3).required()
  };
  return Joi.validate(course, schema);
}

//DELETE rounte handler
app.delete('/api/courses/:id', (req, res) => {
  //Look up the ID
  const course = courses.find(c => c.id === parseInt(req.params.id));
  //Not existing , return 404
  if (!course) return res.status(400).send('The given course Id is not found');

  //DELETE
  const index = courses.indexOf(course);
  courses.splice(index, 1); //remove 1 object

  //return the same course or empty object
  // res.send(course);
  res.status(200).send('{}');

});



// environment variables/ PORT - an env var is part
//of env on which the process runs
// export PORT = 5000 - run this on cmd terminal
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on ${port}....`));
