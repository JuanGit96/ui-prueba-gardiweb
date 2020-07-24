import axios from 'axios'

export default class ClientService 
{
    url = "http://localhost:8000/api/clients"

    getAll()
    {
        return axios.get(this.url)
    }

    save(client)
    {
        return axios.post(this.url, client, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

    }

    update(id, client)
    {
        return axios.put(this.url+"/"+id, client, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }

    delete(id)
    {
        return axios.delete(this.url+"/"+id)
    }
}