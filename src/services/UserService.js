import axios from 'axios'

export default class UserService 
{
    url = "http://localhost:8000/api/users"

    getAll()
    {
        return axios.get(this.url)
    }

    save(usuario)
    {
        return axios.post(this.url, usuario)
    }

    update(id, usuario)
    {
        return axios.put(this.url+"/"+id, usuario)
    }

    delete(id)
    {
        return axios.delete(this.url+"/"+id)
    }
}