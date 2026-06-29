import apiClient from "./apiClient";

export const getProducts = async (page = 0, size = 10) => {
    const response = await apiClient.get(
        `/products?page=${page}&size=${size}`
    );

    return response.data;
};

export const getProductById = async (id) => {
    const response = await apiClient.get(`/products/${id}`);

    return response.data;
};

export const createProduct = async (product) => {
    const response = await apiClient.post(
        "/products",
        product
    );

    return response.data;
};

export const updateProduct = async (id, product) => {
    const response = await apiClient.put(
        `/products/${id}`,
        product
    );

    return response.data;
};

export const deleteProduct = async (id) => {
    await apiClient.delete(`/products/${id}`);
};

export const getProductsByCategory = async (
    categoryId,
    page = 0,
    size = 10
) => {

    const response = await apiClient.get(
        `/products/category/${categoryId}?page=${page}&size=${size}`
    );
    return response.data;
};