import apiClient from "./apiClient";

export const createOrderFromCart = async (
    cartId
) => {

    const response =
        await apiClient.post(
            `/orders/cart/${cartId}`
        );

    return response.data;
};

export const getOrderById = async (
    orderId
) => {

    const response =
        await apiClient.get(
            `/orders/${orderId}`
        );

    return response.data;
};

export const getOrdersByUserId = async (
    userId
) => {

    const response =
        await apiClient.get(
            `/orders/user/${userId}`
        );

    return response.data;
};

export const confirmOrder = async (
    orderId
) => {

    const response =
        await apiClient.patch(
            `/orders/${orderId}/confirm`
        );

    return response.data;
};

export const getOrderStatus = async (
    orderId
) => {

    const response =
        await apiClient.get(
            `/orders/status/${orderId}`
        );

    return response.data;
};
