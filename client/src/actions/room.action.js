import axios from "axios";

export const GET_ROOMS = "GET_ROOMS";

export const getRooms = () => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api`)
      .then((res) => {
        dispatch({ type: GET_ROOMS, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};