import apiClient from "./apiClient";

export const createPayment = async (orderId) => {
    const response = await apiClient.post(
        `/payment/order/${orderId}`
    );

    return response.data;
};
