/*const validators2 = ()=>{
    const errors = {}
    const isRequerided =(name, value)=>{
        if(!value || value.trim().length === 0){
            errors[name] = "El campo es requerido"
        }else{
            errors[name] = ""
        }
        return errors
    }

    const isPassword =(name, value)=>{
        let regexNumber = /^[0-9]+$/
        const requerided = isRequerided(name, value)
        if(!requerided[name]){
            if(!regexNumber.test(value)){
                errors[name] = "solo se aceptan numeros"
            }else{
                errors[name] = ""
            }

            return errors

        }else{
            return requerided
        }
    }

    const isEqualsPassword = (name, valuePassword, valueConfirmPassword)=>{
        const functionPassword = isPassword(name, valueConfirmPassword)
        if(!functionPassword[name]){
            if(valuePassword !== valueConfirmPassword){
                errors[name] = "las contraseñas no son iguales"  
            }else{
                errors[name] = ""
            }
            return errors
        }else{
            return functionPassword
        }
    }

    return{
        isPassword,
        isEqualsPassword
    }
}
*/

export const validators = (name, value,extra=undefined)=>{
    let errors = ""

    const isRequerided =()=>{
        if(!value || value.trim().length === 0){
            errors = "El campo es requerido"
        }else{
            errors = ""
        }
        return errors
    }

    const isPassword =()=>{
        let regexNumber = /^[0-9]+$/
        let requerided = isRequerided()
        if(!requerided){
            if(!regexNumber.test(value)){
                errors = "solo se aceptan numeros"
            }else{
                errors = ""
            }
            return errors
        }
    }

    const isEqualsPassword = () =>{
        isPassword()
        if(!errors){
            if(value !== extra){
                errors = "las contraseñas no son iguales"  
            }else{
                errors = ""
            }
        }
    }

    switch(name){
        case 'password': 
            isPassword();
            break;
        case 'password_confirmation':
            isEqualsPassword()
            break;
        default:
            console.log('no se encontró nigún campo')
    }
    return errors
}