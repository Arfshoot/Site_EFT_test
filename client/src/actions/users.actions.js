import axios from "axios";

export const GET_USERS = "GET_USERS";
export const BLOCK_USER = "BLOCK_USER";
export const UNBLOCK_USER = "UNBLOCK_USER";

export const getUsers = () => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/user`)
      .then((res) => {
        dispatch({ type: GET_USERS, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const blockUser = (userId) => {
  return (dispatch) => {
    return axios
      .post(`${process.env.REACT_APP_API_URL}api/user/block`, { userId })
      .then((res) => {
        dispatch({ type: BLOCK_USER, payload: userId });
      })
      .catch((err) => console.log(err));
  };
};

export const unblockUser = (userId) => {
  return (dispatch) => {
    return axios
      .post(`${process.env.REACT_APP_API_URL}api/user/unblock`, { userId })
      .then((res) => {
        dispatch({ type: UNBLOCK_USER, payload: userId });
      })
      .catch((err) => console.log(err));
  };
};
