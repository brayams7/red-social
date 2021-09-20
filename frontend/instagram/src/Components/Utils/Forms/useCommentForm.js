import { useState, useCallback } from "react";

const palabrasErroneas = ['put','mier','mamahuevo','cerot']

const handleErros = (text)=>{
    let listText = text.split(' ')
    let erros = []

    for (const value of listText) {
        if(value === (palabrasErroneas[0]||palabrasErroneas[1]||palabrasErroneas[2]||palabrasErroneas[3])){
            erros.concat('palabras inadeacuadas de utilizar')
        }
    }

    return erros
}

export const useCommentForm = (onComment, initialComments) => {

    const [commentForm, setCommentForm] = useState(initialComments)
    const [errorsComment, setErrosComment] = useState([])

    const handleChange=(e)=>{
        setCommentForm(
            e.target.value
        )
    }

    /*const handleChange = useCallback((e)=>{
        setCommentForm(
            e.value.target
        )
    },[commentForm])*/

    const handleSubmit = ()=>{
        const handleErrors = handleErros()
        if(handleErrors.length === 0){
            onComment(commentForm)
        }else{
            setErrosComment(handleErros)
        }
    }


    return {
        handleChange,
        handleSubmit,
        commentForm,
        errorsComment
    }        
    
};
