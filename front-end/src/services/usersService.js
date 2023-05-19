import axios from 'axios';
const baseUrl = '/api/users';

const getAllUsers = () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data);
};
const addUser = async newObject => {
    const response = await axios.post(baseUrl, { content:newObject });
    return response.data;
};

export default { getAllUsers, addUser };