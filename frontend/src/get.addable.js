import axios, { Axios } from 'axios'

const getAddable = (email) =>{
    return axios.get("http://localhost/v1/getaddableinterestlist?email=" + email)
}

const getActiveInterest = (email) => {
    return axios.get("http://localhost/v1/getactiveinterestlist?email="+email)
}

const addNewInterest = (emailUser, newInterestName) =>{
    const bodyText = {
        type: "add",
        infopackage: {
            email: emailUser,
            interestName: newInterestName
        }
    }
    return axios.put("v1/manipulateinterest ",bodyText)
}

const removeInterest = (emailUser, removeInterestName) =>{
    const bodyText = {
        type: "add",
        infopackage: {
            email: emailUser,
            interestName: removeInterestName
        }
    }
    return axios.put("v1/manipulateinterest ",bodyText)
}

export default {getAddable, addNewInterest, removeInterest, getActiveInterest}