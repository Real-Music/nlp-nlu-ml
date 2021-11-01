import client from './client';

const endpoint = "/listings";
const config = {
    onUploadProgress: progressEvent => console.log(Math.round((progressEvent.loaded * 100) / progressEvent.total))
}
const getListings = () => client.get(endpoint);

const addListings = ({ title, price, category, description, images, location = null }, onUploadProgress) => {
    const data = new FormData();
    data.append("title", title)
    data.append("price", price)
    data.append("categoryId", category.id)
    data.append("description", description)
    images.map(img => data.append("images", img))

    if (location) data.append("location", JSON.stringify(location));

    return client.post(endpoint, data, {
        onUploadProgress: progressEvent => onUploadProgress(progressEvent.loaded / progressEvent.total)
    })
}

export default {
    getListings,
    addListings
}