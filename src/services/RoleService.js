import axios from 'axios'

export default class RoleService 
{
    url = "http://localhost:8000/api/roles"

    getAll()
    {
        return axios.get(this.url)
    }

    save(role)
    {
        return axios.post(this.url, role)
    }

    update(id, role)
    {
        return axios.put(this.url+"/"+id, role)
    }

    delete(id)
    {
        return axios.delete(this.url+"/"+id)
    }
}