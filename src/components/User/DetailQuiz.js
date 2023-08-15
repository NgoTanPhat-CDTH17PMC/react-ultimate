import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getDataQuiz, postSubmitQuiz } from "../../sevices/apiServices";
import _ from "lodash";
import "./DetailQuiz.scss";
import Question from "./Question";
import { useState } from "react";
import { toast } from "react-toastify";
import ModalResult from "../Admin/Content/ModalResult";

/*
"DT": {
  "id": ,
  "name":"Bai test ky nang doc",
  "description": "Khong doc cung lam duoc",
  "image": ""
},
"EC": 0,
"EM": "Get quizzes data succeed"
*/

const DetailQuiz = (props) => {
  const param = useParams();
  const quizId = param.id;
  const location = useLocation(); // muon biet nguoi dung tu trang nao den

  const [dataQuiz, setDataQuiz] = useState([]);
  const [index, setIndex] = useState(0); // check xem dang o cau hoi so index
  const [dataModalResult, setDataModalResult] = useState(false);

  const [isShowModalResult, setIsShowModalResult] = useState(false);

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
            item.answer.isSelected = false;
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
  };

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

  const handleCheckbox = (answerId, questionId) => {
    let dataQuizClone = _.cloneDeep(dataQuiz); // vi dataQuiz khong cap nhat truc tiep duoc nne la phai clone
    let question = dataQuizClone.find(
      (item) => +item.questionId === +questionId
    ); // tim cau hoi vua chon tu Question
    if (question && question.answers) {
      let b = question.answers.map((item) => {
        // tim cau hoi
        if (+item.id === +answerId) {
          item.selected = !item.isSelected; // update cau tra loi
        }
        return item;
      });
      question.answer = b; // cap nhat lai dataQuizClone
    }

    let index = dataQuizClone.findIndex(
      (item) => +item.questionId === questionId
    );
    if (index > -1) {
      dataQuizClone[index] = question; // question da duoc cap nhat o tren ne duoc gan vao data
      setDataQuiz(dataQuizClone); // update lai ket qua cho cau hoi
    }
  };

  const handleFinish = async () => {
    //xu ly data de upload ket qua llen api
    let payload = {
      quizId: +quizId,
      answer: [],
    };
    let answers = [];
    if (payload && dataQuiz.length > 0) {
      dataQuiz.forEach((question) => {
        let questionId = question.questionId;
        let userAnswerId = [];

        question.answer.forEach((a) => {
          // doi voi moi answer thi se chon nhung thang isSelected = true
          if (a.isSelected === true) {
            userAnswerId.push(a.id);
          }
        });

        answers.push({
          questionId: questionId,
          userAnswerId: userAnswerId,
        });
      });
    }

    payload.answer = answers;

    // submit api

    let res = await postSubmitQuiz(payload);
    if (res && res.EC === 0) {
      setDataModalResult({
        countCorrect: res.DT.countCorrect,
        countTotal: res.DT.countTotal,
        quizData: res.DT.quizData,
      });
      setIsShowModalResult(true);
    } else {
      toast.error("some thing wrongs...");
    }
    /*
    {
      DT: {
        countCorrect: 0
        countTotal: 3
        quizData: [ // dung de hien thi dap an
          {
            isCorrect: true,
            questionId: 1, // cau hoi thu 1
            systemAnswers: [{
              id: 3,
              description: 'Noi dung cua cau hoi?',
              correct_answer: true
            }] // dap an cua he thong
            userAnswers: [1,2,3] // nguoi dung tra loi
          },
          {},
          {}
        ]
        EC: 0;
        EM: "Submit the quiz successed"
      }

    }
    */
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
            handleCheckbox={handleCheckbox}
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
          <button className="btn btn-warning" onClick={() => handleFinish()}>
            Finish
          </button>
        </div>
      </div>
      <div className="right-content">count down</div>

      <ModalResult
        show={isShowModalResult}
        setShow={setIsShowModalResult}
        dataModalResult={dataModalResult}
      />
    </div>
  );
};
export default DetailQuiz;
