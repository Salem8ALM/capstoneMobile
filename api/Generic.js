import instance from "./index";
import { Buffer } from "buffer"; // Import the Buffer library

const fetchImage = async (token, id) => {
  try {
    const base64Data = await instance
      .get(`/api/files/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "arraybuffer",
      })
      .then((response) =>
        Buffer.from(response.data, "binary").toString("base64")
      )
      .catch((error) => {
        console.log("Error getting image: " + error.response.data);
        throw error; // Re-throw to handle it in the calling function
      });

    return `data:image/png;base64,${base64Data}`;
  } catch (error) {
    console.log("Error getting image: " + error.response.data);
    throw error; // Re-throw to handle it in the calling function
  }
};

const getFinancialStatementAPI = async (token) => {
  try {
    const response = await instance.get(`/api/files/${2}`, null, {
      headers: {
        Authorization: `Bearer ${token}`, // Attach the token here
      },
    });
    console.log(response.data.data);

    return response.data;
  } catch (error) {
    throw error; // Re-throw to handle it in the calling function
  }
};

export { fetchImage };
