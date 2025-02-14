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
  try {
    const response = await instance.get(controller + "/request/all", {
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

const acceptOfferAPI = async (token, loanRequestId, loanResponseId) => {
  console.log(`token: ${token}`);
  try {
    const response = await instance.post(
      `${controller}/offer/accept`,
      { loanRequestId, loanResponseId }, // Send as JSON body
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const withdrawLoanRequestAPI = async (token, id) => {
  try {
    const response = await instance.post(
      `${controller}/offer/withdraw/${id}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log("Error to withdraw:", error);

    throw error;
  }
};

const rejectOfferAPI = async (token, loanRequestId, loanResponseId) => {
  try {
    const response = await instance.post(
      `${controller}/offer/reject`,
      { loanRequestId, loanResponseId }, // Send as JSON body
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error accepting offer:", error);
    throw error;
  }
};

export {
  sendLoanRequest,
  getAllRequestsAPI,
  acceptOfferAPI,
  withdrawLoanRequestAPI,
  rejectOfferAPI,
};
