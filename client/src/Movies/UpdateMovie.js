import React, {useState, useEffect} from 'react';
import axios from 'axios';

const UpdateMovie = (props) => {

    // State input
    const id = props.match.params;

    const movie = { 
        id: null,
        title: '',
        director: '',
        metascore: '',
        stars: []
    }

    const [update, setUpdate] =useState(movie);

    // Get Data from API and set the state
    useEffect(() => {
        axios.get(`http://localhost:5000/api/movies/${id}`)
        .then(res => setUpdate(res.data))
        
        .catch(err => console.log(err));
    }, [id])


    console.log(id)

    const handleChange = (event) => {
        setUpdate({...update, [event.target.value]:event.target.value})
    }

    const handleStars = (event) => {
        setUpdate({
            ...update,
            stars: [event.target.value]
        })
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(movie)
        axios.put(`http://localhost:5000/api/movies/${id}`, update)
        .then(res =>{
            console.log(res);
            setUpdate(movie)
            props.history.push('/');
        })
        .catch(error => {console.log(error);
        })

    }

    console.log(update)

    return(
        <div>
            <h1 style={{textAlign:'center'}}>Update your movie</h1>
            <form onSubmit={handleSubmit}>
                <label>Title:</label>
                <input type='text'
                placeholder='Title'
                name='title'
                value={update.title}
                onChange={handleChange}
                />
            <br />

                <label>Director:</label>
                <input type="text" 
               placeholder="Director" 
               name="director"
               value={update.director}
               onChange={handleChange}/>

            <br />

                <label>Meta-Score:</label>
                <input type="text" 
               placeholder="Meta score" 
               name="metascore" 
               value={update.metascore} 
               onChange={handleChange}/>   

            <br />

                <label>Stars:</label>           
                <input 
                type='text'
                name='stars'
                placeholder='stars'
                value={update.stars}
                onChange={handleStars}
            />
        <button>Update</button>                   

            </form>
        </div>
    )
}

export default UpdateMovie;