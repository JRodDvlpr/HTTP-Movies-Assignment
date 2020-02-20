import React, {useState, useEffect} from 'react';
import axios from 'axios';


//UI Library
import {Card, Input, Button, Form} from 'antd';

const movie = { 
    id: null,
    title: '',
    director: '',
    metascore: '',
    stars: []
}

const UpdateMovie = (props) => {

    // State input
    const id = props.match.params;
 
    const [update, setUpdate] =useState(movie);

    // Get Data from API and set the state
    useEffect(() => {
        axios.get(`http://localhost:5000/api/movies/${id}`)
        .then(res => setUpdate(res.data))
        .catch(err => console.log(err));
    }, [id])


    console.log(id)
    
    const handleSubmit = (event) => {
        console.log(movie)
        axios.put(`http://localhost:5000/api/movies/${update.id}`, update)
        .then(res =>{
            console.log(res);
            setUpdate(movie)
            props.history.push('/');
        })
        .catch(error => {console.log(error);
        })

    }

    const handleChange = (event) => {
        setUpdate({...update, [event.target.value]:event.target.value})
    }

    const handleStars = (event) => {
        setUpdate({
            ...update,
            stars: [event.target.value]
        })
    }

    console.log(update)

    return(
        <Card id="updateCard">
            <h1 style={{textAlign:'center'}}>Update your movie</h1>
            <Form onSubmit={handleSubmit}>
                <h3>Title: </h3>
                <Input type='text'
                placeholder='Title'
                name='title'
                value={update.title}
                onChange={handleChange}
                />
            <br />

                <h3>Director: </h3>
                <Input type="text" 
               placeholder="Director" 
               name="director"
               value={update.director}
               onChange={handleChange}/>

            <br />

                <h3>Meta-Score: </h3>
                <Input type="text" 
               placeholder="Meta score" 
               name="metascore" 
               value={update.metascore} 
               onChange={handleChange}/>   

            <br />

                <h3>Stars: </h3>           
                <Input 
                type='text'
                name='stars'
                placeholder='Actors'
                value={update.stars}
                onChange={handleStars}
            />
            <Button id='updateBtn'>Update</Button>                   

            </Form>
        </Card>
    )
}

export default UpdateMovie;