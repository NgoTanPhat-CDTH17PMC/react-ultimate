import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDataQuiz } from "../../sevices/apiServices";

const DetailQuiz = (props) => {
  const param = useParams();
  const quizId = param.id;

  useEffect(() => {
    fetchQuestion();
  }, [quizId]);

  const fetchQuestion = async () => {
    let res = await getDataQuiz(quizId);
  };
  return <div className="detail-quiz-container">Detail Quiz</div>;
};
export default DetailQuiz;
