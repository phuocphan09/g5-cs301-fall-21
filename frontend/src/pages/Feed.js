import React from 'react'

const Feed = () => {
    const localUser = localStorage.getItem("user")

    return (
        <div>
            <h1>this is {localUser}</h1>
        </div>
    )
}

export default Feed
