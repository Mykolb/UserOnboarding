import React, {useState, useEffect} from 'react';
//like importing a ui library components
import {  withFormik, Form, Field} from 'formik';
// //Material UI for for-mik
import { TextField } from 'formik-material-ui';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
//import yup//
import * as Yup from 'yup';
import axios from 'axios';
import './Login.css';


//data shape

// _id: props._id,
// name: props.name,
// age: props.age,
// grade: props.grade,
// address: props.address,
// date: props.date

//Field replaces input
//onchange is handled by formik 
//connect input validation by adding deconstructed props that are available within the withFormik component 
//touched props keeps error message from oappearing when you type for the first time 
//values another prop so formik can keep track of what is checked and not checked 



const Login = ({ errors, touched, values, status }) => {
      // need
      const [signin, setSignin] = useState([]);
      // console.log(signin)

      useEffect(() => {
        if(status) {
          setSignin([...signin, status])
        }
      }, [status])


  return(
    <div>
      <h2>Please Add A Student</h2>
    <Form className='container'>
      {touched.name && errors.name && <p>{errors.name}</p> }
      <Field
        className='field'
        type='_id'
        name='_id'
        label='Enter ID here'
        component={TextField} //material-ui-text field
        margin='normal'
        variant='outlined'
        fullWidth
      />
      {/* creates error message */}
      {touched.email && errors.email && <p>{errors.email}</p>}
      <Field
        className='field'
        type='name'
        name='name'
        label='Enter name here'
        component={TextField}
        margin='normal'
        variant='outlined'
        fullWidth
      />
  
      {touched.age && errors.age && <p>{errors.age}</p>}
      <Field
        className='field'
        type='age'
        name='age'
        label='Enter age here'
        component={TextField}
        margin='normal'
        variant='outlined'
        fullWidth
      />

      {touched.grade && errors.grade && <p>{errors.grade}</p>}
       <Field
        className='field'
        type='grade'
        name='grade'
        label='Enter grade here'
        component={TextField}
        margin='normal'
        variant='outlined'
        fullWidth
      />
      {touched.date && errors.date && <p>{errors.date}</p>}
      <Field 
      className='field'
      type='date'
      name='date'
      component={TextField}
      margin='normal'
      variant='outlined'
      fullWidth
      /> 
     <>
      {touched.address && errors.address && <p>{errors.address}</p>}
      <Field 
      className='address'
      type='address'
      name='address'
      label='Enter your school address here'
      component={TextField}
      margin='normal'
      variant='outlined'
      multiline
      rows='4'
      fullWidth
    />
    </>
    <Button type='submit'  margin='normal' fontSize='small' fullWidth color='primary'>
    Press Me
    </Button>
    </Form>

    {signin.map(sign => (
        <h3 key={sign.id}>You are logged in under the name: {sign.name}</h3>
      ))}

  </div>
  )
}


//using HOC to wrap login with formik
//mapPropsToValues create connection between data and handles; pass in defailt or custom darar to the form 
//have to add new fields 
const FormikLogin = withFormik({
  mapPropsToValues({ name, email, password, tos, user, address}) {
    return {
      name: name || '',
      email: email || '',
      password: password || '',
      tos: tos || '',
      user: user || '', //changes default value 
      address: address || ''
    }
  },

  //validation schema 
  //telling what shape the data should be like prop types 
  //form validation: user feedback on filling out the form correctly
  // yup will pass or fail the input depending on what you put in 
  //can create custom errors,
  validationSchema: Yup.object().shape({
    _id: Yup.number()
      .required(),
    name: Yup.string()
      .max(20, 'Name exceeds character limit') 
      .uppercase('name is case sensitive'), //not working
    grade: Yup.string()
      .grade()
      .required('Please enter a grade'),
    age: Yup.number()
      .min(1, "Please enter a password that is 4 characters or longer")
      .required(),
    address: Yup.string()
    .notRequired()
    .max(200, 'Address had exceeded character limit'),

  }),

  // Set a top-level status to anything you want imperatively.
  //  Useful for controlling arbitrary top-level state related to your form. 
  //  For example, you can use it to pass API responses back into your component in handleSubmit.
  handleSubmit(values, {resetForm, setErrors, setSubmitting, setStatus}) {
    // console.log(values
  if (values.email === 'waffle@syrup.com') {
    setErrors({ email: 'Email was already registered, please try another'})
  } else {
    axios
      .post('https://useronboarding-back-end.herokuapp.com/student', values)
      .then(res => {
        // console.log(res.data)
        setStatus(res.data)
        resetForm();
        setSubmitting(false)
      })
      .catch(err => {
        console.log(err)
        setSubmitting(false)
      })

  }
  let info = prompt('Are you sure you want to be signed in under this account?', values.email)
  alert(`You are signed in as ${info}, ${values.user} account`)
  }

})(Login)


//changed name of export from login to hoc name 
export default FormikLogin;