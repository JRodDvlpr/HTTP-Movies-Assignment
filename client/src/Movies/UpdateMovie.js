import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';

import {Card, Input, Button, Form} from 'antd';

const movie = { 
    title: '',
    director: '',
    metascore: '',
    stars: []
}

const UpdateMovie = props => {

    // State input
    // const {id} = props.match.params;
 
    const [update, setUpdate] = useState(movie);

    // Get Data from API and set the state
    useEffect(() => {
        axios.get(`http://localhost:5000/api/movies/${props.match.params.id}`)
        .then(res => setUpdate(res.data))
        .catch(err => console.log(err));
    }, [props.match.params.id])


    // console.log(id)

    const handleChange = (event) => {
        setUpdate({...update, [event.target.name]:event.target.value});
    };

    const handleStars = (event) => {
        setUpdate({
            ...update,
            stars: [event.target.value],
        })
    }
    
    const handleSubmit = () => {
        // event.preventDefault();
        console.log(movie)
        axios.put(`http://localhost:5000/api/movies/${update.id}`, update)
        .then(res =>{
            props.history.push('/');
        })
        .catch(error => {console.log(error);
        })

    }

    console.log(update)

    return(
        <Card id="updateCard" >
        <Form onSubmit={handleSubmit}>
            <h1 style={{textAlign:'center'}}>Update your movie</h1>
                <h3>Title: </h3>
                <Input style={{textAlign:'center'}} type='text'
                placeholder='Title'
                name='title'
                value={update.title}
                onChange={handleChange}
                />
            <br />

                <h3>Director: </h3>
                <Input style={{textAlign:'center'}} type="text" 
               placeholder="Director" 
               name="director"
               value={update.director}
               onChange={handleChange}/>

            <br />

                <h3>Meta-Score: </h3>
            <Input style={{textAlign:'center'}} type="text" 
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
            <button>Update</button>                   

        </Form>
        </Card>
    )
}

export default UpdateMovie;