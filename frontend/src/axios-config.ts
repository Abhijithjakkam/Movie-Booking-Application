
import axios from 'axios'; 


export function configureAxios() {
    //To send cookies with every request to the backend
    axios.defaults.withCredentials = true;
}