import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Container, Card, Button, DelButton} from '../styles/styledComponents'

const EditStudentForm = props => {
console.log('EDIT STUDENT', props)

const [state, setState] = useState({
_id: props._id,
name: props.name,
age: props.age,
grade: props.grade,
address: props.address,
date: props.date
})

//handlechange
const handleChange = e => {
    setState({ ...state, [e.target.name]: e.target.value})
}

//edit form submit 
//needs to be capital letter fo functional component 
const EditForm = (id, e) => {
    e.preventDefault()
    useEffect(() => {
        axios.put(`https://useronboarding-back-end.herokuapp.com/student/${id}`)
        .then(res => setState({ id: res.data }))
        // .then(res => console.log(res.data))
        .catch(err => console.log(err.message))
    }, [])
}


    return(
        <>
        <Container>
            <Card>
            <form onSubmit={EditForm}>
                <input
                name='_id'
                type='number'
                placeholder='id'
                onChange={handleChange}
                value={state._id}
                />
                <input
                name='name'
                type='text'
                placeholder='Name'
                onChange={handleChange}
                value={state.name}
                />
                <input
                name='age'
                type='number'
                placeholder='Age'
                onChange={handleChange}
                value={state.age}
                />
                <input
                name='grade'
                type='text'
                placeholder='Grade'
                onChange={handleChange}
                value={state.grade}
                />
                <input
                name='address'
                type='text'
                placeholder='Address'
                onChange={handleChange}
                value={state.address}
                />
                <Button>Save</Button>
            </form>
            </Card>
            </Container>
        </>
    )
}




export default EditStudentForm