export const helpWhitTokenHttp = () =>{
    const URLObtainToken = "http://localhost:8000/usuario/obtain_token/"
    //const request = require('superagent');

    const handleError = ({err,status, statusText}) => {
        // Estado 401 o 403 redirigen al login
        if (status === 401 || status === 403) {
            localStorage.removeItem('Token');
            localStorage.removeItem('username');
            localStorage.removeItem('name');
            localStorage.removeItem('last_name');
            console.log(statusText)
            window.location.assign('/#/login');
        } else {
            console.log("hola");
        }
    }
    /*
    function _postMultiPart(path, body, attachments, params = {}) {
        const url = path
        const token = getToken();
        let result;
        if (getToken()) {
            result = request.post(url).set('Authorization', token);
        } else {
            result = request.post(url);
        }
        attachments.forEach((attachment) => {
            result.attach(attachment.name, attachment.file);
        });
        const data = JSON.stringify(body);
        result.field('data', data);
        return result;
    }
    function postAttachments(path, body, attachments, params = {}) {
        return new Promise((resolve, reject) => {
            _postMultiPart(path, body, attachments, params).then((response) => {
                if (response.body) {
                    resolve(response.body);
                }
                resolve(response);
            }).catch((error) => {
                handleError(error.response);
                reject(error.response.body);
            });
        });
    }
    */
    const getToken = ()=>{
        return localStorage.getItem('Token') || ''
    }

    const customFetch = (url,options) =>{
        const defaulHeaders = {
            'Content-Type':"application/json",
            Authorization: `Token ${getToken()}`
        }

        const controller  = new AbortController();
        options.signal = controller.signal
        options.method = options.method || "GET"
        options.headers = options.headers ? {...defaulHeaders, ...options.headers} : defaulHeaders

        options.body = JSON.stringify(options.body) || false
        if (!options.body){
            delete options.body
        }

        setTimeout(()=> controller.abort(),3000)

        return fetch(url, options)
        .then((obj)=>{
            return obj.ok === true ? obj.json() : Promise.reject({err:true, status: obj.status, statusText: obj.statusText})
        }
        )
        .catch((err)=>{
            handleError(err)
            return err
        })
    }

    const customFetchAttachments = (url,options) =>{
        const defaulHeaders = {
            Authorization: `Token ${getToken()}`
        }

        const controller  = new AbortController();
        options.signal = controller.signal
        options.method = options.method || "GET"
        options.headers = options.headers ? {...defaulHeaders, ...options.headers} : defaulHeaders

        console.log('body', options.body)
        
        //console.log(f, f.get("data"))
        setTimeout(()=> controller.abort(),3000)

        return fetch(url, options)
        .then((obj)=>{
            return obj.ok === true ? obj.json() : Promise.reject({err:true, status: obj.status, statusText: obj.statusText})
        }
        )
        .catch((err)=>{
            handleError(err)
            return err
        })
    }

    const postAttachments = (url, options={})=>{
        options.method = 'POST'
        return customFetchAttachments(url, options)
    }

    const get = (url,options={}) =>{
        return customFetch(url, options)
    }

    const post = (url,options={}) =>{
        options.method = 'POST'
        return customFetch(url, options)
    }

    const put = (url, options={}) =>{
        options.method = 'PUT'
        return customFetch(url, options)
    }

    const del = (url, options={}) =>{
        options.method = 'DELETE'
        return customFetch(url, options)
    }

    //setea los datos cuando se hace login 
    const checkingLogin = (response) =>{
        if(!response.err){
            localStorage.setItem('Token', response.token)
            localStorage.setItem('username', response.user.username)
            localStorage.setItem('name',response.user.name)
            localStorage.setItem('last_name', response.user.last_name)
            //localStorage.setItem('change_first_profile', response.user.last_name)
        }else{
            console.error('Ocurrió un error')
        }
    }
   
    const obtainToken = (url, token) =>{
         
        return get(url , {
            headers: {Authorization:`Token ${token}`}
        })
        .then(response =>{
            if(!response.err){
                localStorage.setItem('Token', response.token)
                localStorage.setItem('username', response.user.username)
                localStorage.setItem('name',response.user.name)
                localStorage.setItem('last_name', response.user.last_name)
            }
            return {'token':response.token}
        })
    }

    const getWhitToken = (url, options={}) =>{
        return obtainToken(URLObtainToken, getToken())
        .then(token =>{
            console.log('token nuevo', token)
            options.headers = {Authorization:`Token ${token.token}`} 
            return get(url, options)
        })
    }

    return {
        get,
        post,
        put,
        del,
        checkingLogin,
        obtainToken,
        getWhitToken,
        postAttachments
    }
}