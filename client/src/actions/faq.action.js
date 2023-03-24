import axios from "axios";

export const GET_FAQ = "GET_FAQ";

export const getFaq = () => {
    return (dispatch) => {
      return axios
        .get(`${process.env.REACT_APP_API_URL}api/faq/`)
        .then((res) => {
          dispatch({ type: GET_FAQ, payload: res.data });
        })
        .catch((err) => console.log(err));
    };
  };