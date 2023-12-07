import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { router } from "../layout/router/Routes";
import { PaginatedResponse } from "../models/Pagination";
import { store } from "../store/configureStore";

axios.defaults.baseURL = "http://localhost:5000/";
axios.defaults.withCredentials = true;

function responseBody(response: AxiosResponse) {
    return response.data;
}

const sleep = () => new Promise(resolve => setTimeout(resolve, 500))

axios.interceptors.request.use(config => {
    const token = store.getState().account.user?.token;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
})

axios.interceptors.response.use(async response => {
    await sleep();
    const pagination = response.headers['pagination'];
    if(pagination){
        response.data = new PaginatedResponse(response.data, JSON.parse(pagination));
        return response;
    }
    return response
}, (error: AxiosError) => {
    const {data, status} = error.response as AxiosResponse;
    switch (status) {
        case 400:
            if (data.errors){
                const modelStateErrors: string[] = [];
                for (const key in data.errors) {
                    if (data.errors[key]) {
                        modelStateErrors.push(data.errors[key])
                    }
                }
                throw modelStateErrors.flat();
            }
            toast.error(data.title);
            break;
        case 401:
            toast.error(data.title);
            break;
        case 500:
            router.navigate('/server-error', {state: {error: data}})
            break;
        default:
            break;
    }
    return Promise.reject(error.response)
}
)

const requests= {
    get: (url: string, params?: URLSearchParams) => axios.get(url,{params}).then(responseBody),
    post: (url: string , body:object) => axios.post(url, body).then(responseBody),
    put: (url: string , body:object) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
}

const catalog = {
    list: (params: URLSearchParams) => requests.get('Product', params),
    details: (id: number) => requests.get(`Product/${id}`),
    fetchFilters: () => requests.get('Product/filters')
}

const TestError = {
    get400Error: () => requests.get('api/Buggy/bad-request'),
    get401Error: () => requests.get('api/Buggy/unauthorised'),
    get404Error: () => requests.get('api/Buggy/not-found'),
    get500Error: () => requests.get('api/Buggy/server-error'),
    getValidationError: () => requests.get('api/Buggy/validation-error'),
}

const Basket = {
    get: () => requests.get('/api/Basket'),
    addItem: (productId: number, quantity = 1) => requests.post(`/api/Basket?productId=${productId}&quantity=${quantity}`, {}),
    removeItem: (productId: number, quantity =1) => requests.delete(`/api/Basket?productId=${productId}&quantity=${quantity}`)
}

const Account = {
    login: (values: any) => requests.post('api/Account/login', values),
    register: (values: any) => requests.post('api/Account/register', values),
    currentUser: () => requests.get('api/Account/currentUser')
}

const Orders ={
    list: () => requests.get('api/Orders'),
    fetch: (id: number) => requests.get(`api/Orders/${id}`),
    create: (values: any) => requests.post('api/Orders', values),
    fetchAddress: () => requests.get('api/Account/getSavedAddress')
}

const agent = {
    catalog,
    TestError,
    Basket,
    Account,
    Orders
}

export default agent;