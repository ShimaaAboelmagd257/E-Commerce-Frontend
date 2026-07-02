import apiClient from "./apiClient";

export const createCart = async (userId) => {
    const response = await apiClient.post(
        `/carts/${userId}`
    );

    return response.data;
};

export const getCartById = async (cartId) => {

    const response =
        await apiClient.get(
            `/carts/${cartId}`
        );

    return response.data;
};
export const getCartByUserId = async (userId) => {

    const response =
        await apiClient.get(
            `/carts/user/${userId}`
        );
        

    return response.data;
};
export const getCartItems = async (
    cartId
) => {

    const response =
        await apiClient.get(`/carts/${cartId}/items` );

    return response.data;
};

export const addItemToCart = async (cartId,productId,quantity = 1) => {

    const response = await apiClient.post(
        `/carts/${cartId}/items`,
        null,
        {
            params: {
                productId,
                quantity
            }
        }
    );

    return response.data;
};
export const removeCartItem = async (cartId,productId) => {

    const response =
        await apiClient.delete(
            `/carts/${cartId}/items/${productId}`
        );

    return response.data;
};
export const updateCartItemQauntity = async (cartId,productId,quantity) => {

    const response =
        await apiClient.put(
            `/carts/${cartId}/items/${productId}`
        );

    return response.data;
};
