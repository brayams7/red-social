export const helpHttp = () =>{
    const customFetch = (url, options) => {
        const defaulHeaders = {
            'Content-Type':"application/json",
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
            console.log(obj)
            return obj.ok === true ? obj.json() : Promise.reject({err:true, status: obj.status || "00", statusText:obj.statusText || 'Ocurrió un error'})
        }
        )
        .catch((err)=>{
            return err
        })
    }

    const get = (url, options={}) => customFetch(url, options) 

    const post = (url, options={}) => {
        options.method = 'POST'
        console.log(options)
        return customFetch(url, options)
    }

    const put = (url, options) => {
        options.method = 'PUT'
        return customFetch(url, options)
    }

    const del = (url, options) => {
        options.method = 'DELETE'
    
        return customFetch(url, options)
    }

    return {
        get,
        put,
        post,
        del
    }
}