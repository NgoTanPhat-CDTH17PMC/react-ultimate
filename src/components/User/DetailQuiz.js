import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getDataQuiz } from "../../sevices/apiServices";
import _ from "lodash";
import "./DetailQuiz.scss";
import Question from "./Question";
import { useState } from "react";

const DetailQuiz = (props) => {
  const param = useParams();
  const quizId = param.id;
  const location = useLocation(); // muon biet nguoi dung tu trang nao den

  const [dataQuiz, setDataQuiz] = useState([]);
  const [index, setIndex] = useState(0); // check xem dang o cau hoi so index

  useEffect(() => {
    fetchQuestion();
  }, [quizId]);

  const fetchQuestion = async () => {
    let res = await getDataQuiz(quizId);
    if (res && res.EC === 0) {
      let raw = res.DT;
      let data = _.chain(raw)
        .groupBy("id")
        .map((value, key) => {
          let answer = [];
          let questionDescription,
            image = null;
          value.forEach((item, index) => {
            if (index === 0) {
              questionDescription = item.description;
              image = item.image;
            }
            answer.push(item.answer);
          });

          return {
            questionId: key,
            answer,
            questionDescription,
            image,
          };
        })
        .value(); // gop theo ID
      //https://prnt.sc/skqoy6QDG9rk
      setDataQuiz(data);
    }

    const handlePrev = () => {
      if (index - 1 < 0) {
        return;
      }
      setIndex(index - 1);
    };

    const handleNext = () => {
      if (dataQuiz && dataQuiz.lenngth > index + 1) {
        setIndex(index + 1);
      }
    };
  };
  return (
    <div className="detail-quiz-container">
      <div className="left-content">
        <div className="title">
          Quiz {quizId.id}: {location?.state.quizTitle}
        </div>
        <hr />
        <div className="q-body">
          <img />
        </div>
        <div className="q-content">
          <Question
            data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[index] : []}
          />
        </div>
        <div className="footer">
          <button className="btn btn-secondary" onClick={() => handlePrev()}>
            Prev
          </button>
          <button className="btn btn-primary" onClick={() => handleNext()}>
            Next
          </button>
        </div>
      </div>
      <div className="right-content">count down</div>
    </div>
  );
};
export default DetailQuiz;
