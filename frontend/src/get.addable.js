import axios from 'axios'

const getAddable = () =>{
    return axios.get("/v1/getaddableinterestlist")
}

const getActiveInterest = () => {
    return axios.get("/v1/getactiveinterestlist")
}

const addNewInterest = (newInterestName) =>{
    const bodyText = {
        type: "add",
        infoPackage: {
            interestName: newInterestName,
        }
    }
    console.log(bodyText)
    return axios.put("/v1/manipulateinterest",bodyText)
}

const removeInterest = (removeInterestName) =>{
    const bodyText = {
        type: "remove",
        infoPackage: {
            interestName: removeInterestName
        }
    }
    return axios.put("/v1/manipulateinterest",bodyText)
}

export default {getAddable, addNewInterest, removeInterest, getActiveInterest}