import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDataQuiz } from "../../sevices/apiServices";
import _ from "lodash";

const DetailQuiz = (props) => {
  const param = useParams();
  const quizId = param.id;

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
      console.log(data);
    }
  };
  return <div className="detail-quiz-container">Detail Quiz</div>;
};
export default DetailQuiz;
