import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null


const setToken = (loginToken) => {
  token = `Bearer ${loginToken}`
}

const getAll = async () => {
  const { data } = await axios.get(baseUrl)
  return data
}

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token }
  }

  const { data } = await axios.post(baseUrl, newBlog, config)
  return data
}

const update = async (id, newBlog) => {
  const { data } = await axios.put(`${baseUrl}/${id}`, newBlog)
  return data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token }
  }

  const { data } = await axios.delete(`${baseUrl}/${id}`, config)
  return data
}

export default {
  setToken,
  getAll,
  create,
  update,
  remove
}
