import axios from 'axios'
// import React, { useState } from 'react'

const GetPost = (id) =>{
    return axios.get("http://localhost:8080/v1/getpost?id="+id)    
    }

export default {GetPost}