import axios from 'axios'

export default class VehicleService 
{
    url = "http://localhost:8000/api/vehicles"

    getAll()
    {
        return axios.get(this.url)
    }

    save(vehicle)
    {
        return axios.post(this.url, vehicle, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }

    update(id, vehicle)
    {
        return axios.put(this.url+"/"+id, vehicle)
    }

    delete(id)
    {
        return axios.delete(this.url+"/"+id)
    }
}