import instance from "./index";

const controller = "/loan";

const sendLoanRequest = async (token, request) => {
  console.log(`token: ${token}`);

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
export { sendLoanRequest };
