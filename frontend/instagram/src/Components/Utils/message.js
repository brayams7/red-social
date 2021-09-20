import React from 'react';

const Message = ({message, bgColor})=>{
    let styles = {
        padding:"1rem",
        marginBottom:"1rem",
        textAlign:"center",
        color:"#fff",
        backgroundColor:bgColor
    }

    return(
        <div style={styles}>
            <h2>
                {message}
            </h2>
        </div>
    )
}

export default Message