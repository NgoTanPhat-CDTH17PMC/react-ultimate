import { useEffect } from "react";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { getDataQuiz, postSubmitQuiz } from "../../sevices/apiServices";
import _ from "lodash";
import "./DetailQuiz.scss";
import Question from "./Question";
import { useState } from "react";
import { toast } from "react-toastify";
import ModalResult from "../Admin/Content/ModalResult";
import RightContent from "./Content/RightContent";
import { Breadcrumb } from "react-bootstrap";
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

  const [dataQuiz, setDataQuiz] = useState([
    {
      questionId: "1",
      questionDescription: "Day la ai ease",
      image:
        "iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3/OAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANCSURBVEiJtZZPbBtFFMZ/M7ubXdtdb1xSFyeilBapySVU8h8OoFaooFSqiihIVIpQBKci6KEg9Q6H9kovIHoCIVQJJCKE1ENFjnAgcaSGC6rEnxBwA04Tx43t2FnvDAfjkNibxgHxnWb2e/u992bee7tCa00YFsffekFY+nUzFtjW0LrvjRXrCDIAaPLlW0nHL0SsZtVoaF98mLrx3pdhOqLtYPHChahZcYYO7KvPFxvRl5XPp1sN3adWiD1ZAqD6XYK1b/dvE5IWryTt2udLFedwc1+9kLp+vbbpoDh+6TklxBeAi9TL0taeWpdmZzQDry0AcO+jQ12RyohqqoYoo8RDwJrU+qXkjWtfi8Xxt58BdQuwQs9qC/afLwCw8tnQbqYAPsgxE1S6F3EAIXux2oQFKm0ihMsOF71dHYx+f3NND68ghCu1YIoePPQN1pGRABkJ6Bus96CutRZMydTl+TvuiRW1m3n0eDl0vRPcEysqdXn+jsQPsrHMquGeXEaY4Yk4wxWcY5V/9scqOMOVUFthatyTy8QyqwZ+kDURKoMWxNKr2EeqVKcTNOajqKoBgOE28U4tdQl5p5bwCw7BWquaZSzAPlwjlithJtp3pTImSqQRrb2Z8PHGigD4RZuNX6JYj6wj7O4TFLbCO/Mn/m8R+h6rYSUb3ekokRY6f/YukArN979jcW+V/S8g0eT/N3VN3kTqWbQ428m9/8k0P/1aIhF36PccEl6EhOcAUCrXKZXXWS3XKd2vc/TRBG9O5ELC17MmWubD2nKhUKZa26Ba2+D3P+4/MNCFwg59oWVeYhkzgN/JDR8deKBoD7Y+ljEjGZ0sosXVTvbc6RHirr2reNy1OXd6pJsQ+gqjk8VWFYmHrwBzW/n+uMPFiRwHB2I7ih8ciHFxIkd/3Omk5tCDV1t+2nNu5sxxpDFNx+huNhVT3/zMDz8usXC3ddaHBj1GHj/As08fwTS7Kt1HBTmyN29vdwAw+/wbwLVOJ3uAD1wi/dUH7Qei66PfyuRj4Ik9is+hglfbkbfR3cnZm7chlUWLdwmprtCohX4HUtlOcQjLYCu+fzGJH2QRKvP3UNz8bWk1qMxjGTOMThZ3kvgLI5AzFfo379UAAAAASUVORK5CYII=",
      answers: [
        {
          id: "1",
          description: "dap an 1",
          isSelected: false,
        },
        {
          id: "2",
          description: "dap an 2",
          isSelected: false,
        },
        {
          id: "3",
          description: "dap an 3",
          isSelected: false,
        },
      ],
    },
    {
      questionId: "2",
      questionDescription: "Toi la ai ease",
      image:
        "iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3/OAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANCSURBVEiJtZZPbBtFFMZ/M7ubXdtdb1xSFyeilBapySVU8h8OoFaooFSqiihIVIpQBKci6KEg9Q6H9kovIHoCIVQJJCKE1ENFjnAgcaSGC6rEnxBwA04Tx43t2FnvDAfjkNibxgHxnWb2e/u992bee7tCa00YFsffekFY+nUzFtjW0LrvjRXrCDIAaPLlW0nHL0SsZtVoaF98mLrx3pdhOqLtYPHChahZcYYO7KvPFxvRl5XPp1sN3adWiD1ZAqD6XYK1b/dvE5IWryTt2udLFedwc1+9kLp+vbbpoDh+6TklxBeAi9TL0taeWpdmZzQDry0AcO+jQ12RyohqqoYoo8RDwJrU+qXkjWtfi8Xxt58BdQuwQs9qC/afLwCw8tnQbqYAPsgxE1S6F3EAIXux2oQFKm0ihMsOF71dHYx+f3NND68ghCu1YIoePPQN1pGRABkJ6Bus96CutRZMydTl+TvuiRW1m3n0eDl0vRPcEysqdXn+jsQPsrHMquGeXEaY4Yk4wxWcY5V/9scqOMOVUFthatyTy8QyqwZ+kDURKoMWxNKr2EeqVKcTNOajqKoBgOE28U4tdQl5p5bwCw7BWquaZSzAPlwjlithJtp3pTImSqQRrb2Z8PHGigD4RZuNX6JYj6wj7O4TFLbCO/Mn/m8R+h6rYSUb3ekokRY6f/YukArN979jcW+V/S8g0eT/N3VN3kTqWbQ428m9/8k0P/1aIhF36PccEl6EhOcAUCrXKZXXWS3XKd2vc/TRBG9O5ELC17MmWubD2nKhUKZa26Ba2+D3P+4/MNCFwg59oWVeYhkzgN/JDR8deKBoD7Y+ljEjGZ0sosXVTvbc6RHirr2reNy1OXd6pJsQ+gqjk8VWFYmHrwBzW/n+uMPFiRwHB2I7ih8ciHFxIkd/3Omk5tCDV1t+2nNu5sxxpDFNx+huNhVT3/zMDz8usXC3ddaHBj1GHj/As08fwTS7Kt1HBTmyN29vdwAw+/wbwLVOJ3uAD1wi/dUH7Qei66PfyuRj4Ik9is+hglfbkbfR3cnZm7chlUWLdwmprtCohX4HUtlOcQjLYCu+fzGJH2QRKvP3UNz8bWk1qMxjGTOMThZ3kvgLI5AzFfo379UAAAAASUVORK5CYII=",
      answers: [
        {
          id: "1",
          description: "dap an 4",
          isSelected: false,
        },
        {
          id: "2",
          description: "dap an 5",
          isSelected: false,
        },
        {
          id: "3",
          description: "dap an 6",
          isSelected: false,
        },
      ],
    },
    {
      questionId: "3",
      questionDescription: "Di dau day....",
      image:
        "iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3/OAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANCSURBVEiJtZZPbBtFFMZ/M7ubXdtdb1xSFyeilBapySVU8h8OoFaooFSqiihIVIpQBKci6KEg9Q6H9kovIHoCIVQJJCKE1ENFjnAgcaSGC6rEnxBwA04Tx43t2FnvDAfjkNibxgHxnWb2e/u992bee7tCa00YFsffekFY+nUzFtjW0LrvjRXrCDIAaPLlW0nHL0SsZtVoaF98mLrx3pdhOqLtYPHChahZcYYO7KvPFxvRl5XPp1sN3adWiD1ZAqD6XYK1b/dvE5IWryTt2udLFedwc1+9kLp+vbbpoDh+6TklxBeAi9TL0taeWpdmZzQDry0AcO+jQ12RyohqqoYoo8RDwJrU+qXkjWtfi8Xxt58BdQuwQs9qC/afLwCw8tnQbqYAPsgxE1S6F3EAIXux2oQFKm0ihMsOF71dHYx+f3NND68ghCu1YIoePPQN1pGRABkJ6Bus96CutRZMydTl+TvuiRW1m3n0eDl0vRPcEysqdXn+jsQPsrHMquGeXEaY4Yk4wxWcY5V/9scqOMOVUFthatyTy8QyqwZ+kDURKoMWxNKr2EeqVKcTNOajqKoBgOE28U4tdQl5p5bwCw7BWquaZSzAPlwjlithJtp3pTImSqQRrb2Z8PHGigD4RZuNX6JYj6wj7O4TFLbCO/Mn/m8R+h6rYSUb3ekokRY6f/YukArN979jcW+V/S8g0eT/N3VN3kTqWbQ428m9/8k0P/1aIhF36PccEl6EhOcAUCrXKZXXWS3XKd2vc/TRBG9O5ELC17MmWubD2nKhUKZa26Ba2+D3P+4/MNCFwg59oWVeYhkzgN/JDR8deKBoD7Y+ljEjGZ0sosXVTvbc6RHirr2reNy1OXd6pJsQ+gqjk8VWFYmHrwBzW/n+uMPFiRwHB2I7ih8ciHFxIkd/3Omk5tCDV1t+2nNu5sxxpDFNx+huNhVT3/zMDz8usXC3ddaHBj1GHj/As08fwTS7Kt1HBTmyN29vdwAw+/wbwLVOJ3uAD1wi/dUH7Qei66PfyuRj4Ik9is+hglfbkbfR3cnZm7chlUWLdwmprtCohX4HUtlOcQjLYCu+fzGJH2QRKvP3UNz8bWk1qMxjGTOMThZ3kvgLI5AzFfo379UAAAAASUVORK5CYII=",
      answers: [
        {
          id: "1",
          description: "dap an 1",
          isSelected: false,
        },
        {
          id: "2",
          description: "dap an 2",
          isSelected: false,
        },
        {
          id: "3",
          description: "dap an 3",
          isSelected: false,
        },
      ],
    },
  ]);
  const [index, setIndex] = useState(0); // check xem dang o cau hoi so index
  const [dataModalResult, setDataModalResult] = useState(false);

  const [isShowModalResult, setIsShowModalResult] = useState(false);

  const [isShowAnswer, setIsShowAnswer] = useState(false);
  const [isSubmitQuiz, setIsSubmitQuiz] = useState(false);

  useEffect(() => {
    fetchQuestion();
  }, [quizId]);

  const fetchQuestion = async () => {
    try {
      let res = await getDataQuiz(quizId);
      if (res && res.EC === 0) {
        let raw = res.DT;
        let data = _.chain(raw)
          .groupBy("id")
          .map((value, key) => {
            let answers = [];
            let questionDescription,
              image = null;
            value.forEach((item, index) => {
              if (index === 0) {
                questionDescription = item.description;
                image = item.image;
              }
              item.answers.isSelected = false;
              answers.push(item.answers);
            });

            answers = _.orderBy(answers, ["id"], ["asc"]);

            return {
              questionId: key,
              answers,
              questionDescription,
              image,
            };
          })
          .value(); // gop theo ID
        //https://prnt.sc/skqoy6QDG9rk
        setDataQuiz(data);
      }
    } catch (e) {
      toast.error(e.message);
    }
  };

  const handlePrev = () => {
    if (index - 1 < 0) {
      return;
    }
    setIndex(index - 1);
  };

  const handleNext = () => {
    if (dataQuiz && dataQuiz.length > index + 1) {
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
          item.isSelected = !item.isSelected; // update cau tra loi
        }
        return item;
      });
      question.answers = b; // cap nhat lai dataQuizClone
    }
    let index = dataQuizClone.findIndex(
      (item) => +item.questionId === +questionId
    );

    if (index > -1) {
      dataQuizClone[index] = question; // question da duoc cap nhat o tren ne duoc gan vao data
      setDataQuiz(dataQuizClone); // update lai ket qua cho cau hoi
    }
  };

  const handleFinishQuiz = async () => {
    //xu ly data de upload ket qua llen api
    let payload = {
      quizId: +quizId,
      answers: [],
    };
    let answers = [];
    if (payload && dataQuiz.length > 0) {
      dataQuiz.forEach((question) => {
        let questionId = question.questionId;
        let userAnswerId = [];

        question.answers.forEach((a) => {
          // doi voi moi answers thi se chon nhung thang isSelected = true
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

    payload.answers = answers;

    // submit api

    try {
      let res = await postSubmitQuiz(payload);
      if (res && res.EC === 0) {
        setIsSubmitQuiz(true);
        setDataModalResult({
          countCorrect: res.DT.countCorrect,
          countTotal: res.DT.countTotal,
          quizData: res.DT.quizData,
        });
        setIsShowModalResult(true);

        // update DataQuiz wih correct answer

        if (res.DT && res.DT.quizData) {
          let dataQuizClone = _.cloneDeep(dataQuiz);
          let a = res.DT.quizData;
          for (let q of a) {
            for (let i = 0; i < dataQuizClone.length; i++) {
              // lap tung cau hoi
              if (+q.questionId === +dataQuizClone[i].questionId) {
                let newAnswers = [];
                for (let j = 0; j < dataQuizClone[i].answers.length; j++) {
                  let s = q.systemAnswer.find(
                    (item) => +item.id === +dataQuizClone[i].answers[j].id
                  );
                  if (s) {
                    dataQuizClone[i].answers[j].isCorrect = true; // tim dap an chinh xac
                  }
                  newAnswers.push(dataQuizClone[i].answers[j]);
                }
                dataQuizClone[i].answers = newAnswers;
              }
            }
          }
          setDataQuiz(dataQuizClone);
        }
      } else {
        toast.error("some thing wrongs...");
      }
    } catch (e) {
      toast.error(e.message);
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
  const handleShowAnswer = () => {
    if (!isSubmitQuiz) return;
    setIsShowAnswer(true);
  };
  return (
    <>
      {/* <Breadcrumb className="quiz-detail-new-header">
        <NavLink to="/" className="breadcrumb-item">
          Home
        </NavLink>
        <NavLink to="/users" className="breadcrumb-item">
          User
        </NavLink>
        <NavLink active>Quiz</NavLink>
      </Breadcrumb> */}
      <div className="detail-quiz-container">
        <div className="left-content">
          <div className="title">
            Quiz {quizId}: {location?.state.quizTitle}
          </div>
          <hr />
          <div className="q-body">
            <img />
          </div>
          <div className="q-content">
            <Question
              handleCheckbox={handleCheckbox}
              data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[index] : []}
              index={index}
              isShowAnswer={isShowAnswer}
              isSubmitQuiz={isSubmitQuiz}
            />
          </div>
          <div className="footer">
            <button className="btn btn-secondary" onClick={() => handlePrev()}>
              Prev
            </button>
            <button className="btn btn-primary" onClick={() => handleNext()}>
              Next
            </button>
            <button
              disabled={isSubmitQuiz}
              className="btn btn-warning"
              onClick={() => handleFinishQuiz()}
            >
              Finish
            </button>
          </div>
        </div>
        <div className="right-content">
          <RightContent
            dataQuiz={dataQuiz}
            handleFinishQuiz={handleFinishQuiz}
            setIndex={setIndex}
          />
        </div>

        <ModalResult
          show={isShowModalResult}
          setShow={setIsShowModalResult}
          dataModalResult={dataModalResult}
        />
      </div>
    </>
  );
};
export default DetailQuiz;
