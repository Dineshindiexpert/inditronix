'use client';
import axios from 'axios';


// create an axios instance with base URL
const API = axios.create({
  baseURL: 'https://dummyjson.com'
});

// mock api base for the authentication

const authentication = axios.create({
  baseURL: 'https://69c884cb68edf52c954dd12a.mockapi.io/mizzle/api'
});



// make an object to all api 
export const apiService = {
  // all products related
  getProducts: () => API.get('/products'),

  // get single product details
  getSingleProduct: (id) => API.get(`/products/${id}`),

  // get all categories
  getCategories: () => API.get('/products/categories'),

  // get products by category
  getProductsByCategory: (category) => API.get(`/products/category/${category}`),

  // all cart related
  getallcart: () => API.get('/carts'),


  // get product by the search query
  searchProducts: (query) => API.get(`/products/search?q=${query}`),





  // ---------------- USERS (AUTH) ----------------


  // for the authentication related api calls

  // for the user management (CRUD) operations

  // get all users 
  getUsers: () => authentication.get('/users'),

  // get user by id

  getUserById: (id) => authentication.get(`/users/${id}`),

  // post a new user 
  registerUser: (data) => authentication.post('/users', data),

  // deleter user by id
  deleteUser: (id) => authentication.delete(`/users/${id}`),


  // update user by id
  updateUser: (id, data) => authentication.put(`/users/${id}`, data)
};


