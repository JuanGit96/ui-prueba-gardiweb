import axios from 'axios'

export default class BrandService 
{
    url = "http://localhost:8000/api/brands"

    getAll()
    {
        return axios.get(this.url)
    }

    save(brand)
    {
        return axios.post(this.url, brand)
    }

    update(id, brand)
    {
        return axios.put(this.url+"/"+id, brand)
    }

    delete(id)
    {
        return axios.delete(this.url+"/"+id)
    }
}