const express = require('express');
const app = express();

//enable a feature needed for POST request
app.use(express.json());

//GET requests
app.get('/',(req,res)=>{
    res.send('Hello there');
});

const courses = [
    {id:1, name:'Web Development'},
    {id:2,name:'IT'},
    {id:3,name:'Cybersecurity'}
];

//GET requests
app.get('/api/courses',(req,res)=>{
    res.send(courses);
});

app.get('/api/courses:id',(req,res)=>{
    const course = courses.find(c=> c.id === parseInt(req.params.id));
    if(!course){
        res.status(404).send("The course with the given ID was not found");
        return
    }
        res.send(course);
});

//POST requests
app.post('/api/courses',(req,res)=>{
    if(req.body.name.length > 3){
        const course={
            id:courses.length +1,
            name: req.body.name
        }
        courses.push(course);
        res.send(course);
    }
    else{
        res.send("name is required and it should be a minimum of 3 characters");
    }
});

//PUT requests
app.put('/api/courses/:id', (req,res)=>{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course){
        res.status(404).send('The course with the given ID was not found');
        return
    }
    const pos = courses.findIndex(c => c.id === parseInt(req.params.id));
    const put = {
        id:req.params.id,
        name:req.body.name
    };
    courses[pos] = put;
    res.send(put);
})

//DELETE requests
app.delete('/api/courses/:id', (req,res)=>{
    const course = courses.find(c =>c.id === parseInt(req.params.id));
    if(!course){
        res.status(404).send("The course with the given ID was not found");
        return
    }
    const pos = courses.findIndex(c => c.id === parseInt(req.params.id));
    courses.splice(pos,1);
    res.send(courses[pos]);
})

app.listen(3000, ()=>{
    console.log('Listening on port 3000')
});