import { create } from "apisauce"

import cache from '../utility/cache';
import authStorage from '../auth/storage';

const apiClient = create({
    baseURL: "http://192.168.1.1:9000/api"
});

apiClient.addAsyncRequestTransform(async (request) => {
    const token = await authStorage.getToken();
    if (!token) return;

    request.headers['x-auth-token'] = token;
})

const get = apiClient.get;
apiClient.get = async (url, params, axiosConfig) => {
    // Before
    const response = await get(url, params, axiosConfig);

    // TODO: Create a BlackList or WhiteList for cached data
    if (response.ok) {
        cache.store(url, response.data);
        return response;
    }

    // After
    const data = await cache.get(url);
    return data ? { ok: true, data } : response;

}

export default apiClient;