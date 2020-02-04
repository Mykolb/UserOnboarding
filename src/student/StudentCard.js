import React, {useState, useEffect} from 'react'
// import Student from './Student'
import axios from 'axios'
import { Container, Card, Button, DelButton } from '../styles/styledComponents'
import EditStudentForm from './EditStudentForm'

const StudentCard = (props) => {

    const [state, setState] = useState({
        students: [],
    })

    const [edit, setEdit] = useState(false)


    useEffect(() => {
        axios.get('https://useronboarding-back-end.herokuapp.com/student')
        .then(res => setState({ students: res.data}))
        // .then(res => console.log(res.data))
        .catch(err => console.log(err))
    }, [])

    //add option to edit and when edit is clicked it switches from card to form 
    //add option to delete each card 

    return(
        <>
          { !edit ? (
        <Container>
          
        {/* <div style={{border: '1px solid red', height: '20px', display: 'flex', float:'right'}}>
            <h2>Student Information</h2>
            <i class="fas fa-plus-circle"> Add A Student</i>
            </div> */}
        {state.students.map(student => {
            return(
                <Card>
                <p>ID: {student._id}</p>
                <p>Name: {student.name}</p>
                <p>Age: {student.age}</p>
                <p>Grade: {student.grade}</p>
                <p>Address: {student.address}</p>
                <p>Date Enrolled: {student.date}</p>
                <Button onClick={() => { setEdit(true)}}>Edit</Button> 
                <DelButton>Delete</DelButton>
                </Card>
            )
        })}
          
    </Container>
      ) : ( <EditStudentForm  {...props} setEdit={setEdit} edit={edit}/>
        )}
    </>
    )
}


export default StudentCard