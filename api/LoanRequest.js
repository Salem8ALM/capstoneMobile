import instance from "./index";

const controller = "/loan";

const sendLoanRequest = async (token, request) => {
  try {
    const response = await instance.post(controller + "/request", request, {
      headers: {
        Authorization: `Bearer ${token}`, // Attach the token here
      },
    });
    return response.data;
  } catch (error) {
    console.log(error.response.data);
    throw error; // Re-throw to handle it in the calling function
  }
};

const getAllRequestsAPI = async (token) => {
  console.log(`inside get all requests: ${token}`);

  try {
    const response = await instance.get(controller + "/request/all", {
      headers: {
        Authorization: `Bearer ${token}`, // Attach the token here
      },
    });
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.log(error.response.data);
    throw error; // Re-throw to handle it in the calling function
  }
};

export { sendLoanRequest, getAllRequestsAPI };
