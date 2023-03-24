import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFaq } from "../actions/faq.action";

// import js  et scss
import "../styles/Faq.scss";

const FaqList = () => {
  const [loadFaq, setLoadFaq] = useState(true);

  const dispatch = useDispatch();
  const faq = useSelector((state) => state.faqReducer);

  useEffect(() => {
    if (loadFaq) {
      dispatch(getFaq());
      setLoadFaq(false);
    }
  }, [loadFaq, dispatch]);

  return (
    <div className="faq-container">
      {faq.map((item) => (
        <div key={item._id}>
          <h2>{item.title}</h2>
          <p>{item.text}</p>
        </div>
      ))}
    </div>
  );
};

export default FaqList;