import { React, useState } from 'react'
import getAddable from '../../get.addable'

const Test = () => {
    const pickStateNA = { color: '#006DFF', width: '18.13vw' }
    let initialInterestState = []
    getAddable.getAddable()
        .then(response => {
            console.log(response.data)
            console.log(response.data.addableInteresList)
            // response.addableInterestList.map((itemAPI, indexAPI) => {
                // initialInterestState.concat({ interestName: itemAPI.interestName, interestState: pickStateNA })
            })
        // })

    return (
        <div>
        </div>
    )
}

export default Test
