import instance from "./index";

const controller = "/chat";

const getMessagesAPI = async (token, id) => {
  console.log(`token: ${token}`);

  try {
    const response = await instance.get(`${controller}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error accepting offer:", error.response);
    throw error;
  }
};

const getChatsAPI = async (token) => {
  console.log(`token: ${token}`);

  try {
    const response = await instance.get(`${controller}/bankers`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error accepting offer:", error.response);
    throw error;
  }
};

const createChatEntityAPI = async (token, chatTargetId) => {
  console.log(`token: ${token}`);

  try {
    const response = await instance.post(
      `${controller}/create`,
      { chatTargetId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error accepting offer:", error.response);
    throw error;
  }
};

const sendMessageAPI = async (token, chatId, content) => {
  console.log(`token: ${token}`);

  try {
    const response = await instance.post(
      `${controller}/${chatId}/message`,
      { content },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error accepting offer:", error.response);
    throw error;
  }
};

export { getMessagesAPI, sendMessageAPI, getChatsAPI };
