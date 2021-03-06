import axios from 'axios'

const getAddable = (email) =>{
    return axios.get("http://localhost:8080/v1/getaddableinterestlist?email=" + email)
}

const getActiveInterest = (email) => {
    return axios.get("http://localhost:8080/v1/getactiveinterestlist?email=" + email)
}

const addNewInterest = (emailUser, newInterestName) =>{
    const bodyText = {
        type: "add",
        infoPackage: {
            email: emailUser,
            interestName: newInterestName,
        }
    }
    console.log(bodyText)
    return axios.put("http://localhost:8080/v1/manipulateinterest",bodyText)
}

const removeInterest = (emailUser, removeInterestName) =>{
    const bodyText = {
        type: "remove",
        infoPackage: {
            email: emailUser,
            interestName: removeInterestName
        }
    }
    return axios.put("http://localhost:8080/v1/manipulateinterest",bodyText)
}

export default {getAddable, addNewInterest, removeInterest, getActiveInterest}