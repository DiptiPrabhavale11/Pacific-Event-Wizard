import axios from 'axios';
const baseUrl = '/api/events';

const getAll = (url) => {
    const requestURL = url ? url : baseUrl;
    const request = axios.get(requestURL);
    return request.then(response => response.data);
};
const create = async (newObject, url) => {
    const requestURL = url ? url : baseUrl;
    const response = await axios.post(requestURL, { content:newObject });
    return response.data;
};

const update = (id, newObject, url) => {
    const requestURL = url ? url : baseUrl;
    const res = axios.put(`${requestURL}/${id}`, { content:newObject });
    return res.then(response => response.data);
};

export default { getAll, create, update };