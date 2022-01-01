import axios from 'axios'
import React, { useState } from 'react'

const ValidateEmail = (email) =>{
    return axios.get("http://localhost:8080/v1/validateemail?email="+email)    
    }

const ValidatePassword = (email,passwordInput) =>{
    const bodyText = {password: passwordInput}
    return axios.post("http://localhost:8080/v1/validatepassword?email="+email,bodyText)
    }

const CreateEmail = (email,passwordInput) =>{
    const bodyText = {password: passwordInput}
    return axios.post("http://localhost:8080/v1/createaccount?email="+email,bodyText)
    }

export default {ValidateEmail, ValidatePassword, CreateEmail}