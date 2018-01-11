import axios from 'axios'

const APIURL = "https://swapi.co/api/"
/******* Login Api Call ******/
export function LoginApi(uname,pwd){
  
  return new Promise((resolve, reject) => {
    axios.get(APIURL+'people/?search='+uname+'&format=json')
    .then(function (response) {
      resolve(response.data);
    })
    .catch(function (response) {
      reject(response);
    });
  })
}
/******* planet Search Api Call ******/
export function PlanetSearchApi(searchText,page){
  
  return new Promise((resolve, reject) => {
    axios.get(APIURL+'planets/?search='+searchText+'&format=json&page='+page)
    .then(function (response) {
      resolve(response.data);
    })
    .catch(function (response) {
      reject(response);
    });
  })
}