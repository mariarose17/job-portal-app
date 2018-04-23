import axios from 'axios';

const BASE_URL='http://localhost:3000/jobportal/';

// axios.interceptors.request.use((config) => {
//     const authValue = JSON.parse(localStorage.getItem('authdata'));
//     console.log(authValue);
// 	if( authValue ) {
		
// 		config.headers['Auth'] = authValue;
	
// 		return config;
// 	}
// 	else {
	
// 		return config;
// 	}
// });

export function getCall(url,params=null){
    return axios.get(BASE_URL+url,{params:params});
    }

    export function putCall(url,body){
        return axios.put(BASE_URL+url,body);
    }
    
    export function postCall(url,body){
        return axios.post(BASE_URL+url,body);
    }
    export function patchCall(url,body){
        return axios.patch(BASE_URL+url,body);
    }
    
    export function deleteCall(url,params=null){
        return axios.delete(BASE_URL+url,{params : params});

}