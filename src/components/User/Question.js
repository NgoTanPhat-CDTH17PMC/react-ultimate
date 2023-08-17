import _ from "lodash";
import { useState } from "react";
import Lightbox from "react-awesome-lightbox";
import { IoIosClose, IoIosCheckmark } from "react-icons/io";

const Question = (props) => {
  const { data, index, handleCheckbox, isShowAnswer, isSubmitQuiz } = props;
  const [isPreviewImage, setIsPreviewImage] = useState(false);

  if (_.isEmpty(data)) {
    return <></>;
  }

  const handleHandleCheckbox = (aId, qId) => {
    handleCheckbox(aId, qId); // day len cho compoent cha xu ly
  };

  return (
    <>
      {data.image ? (
        <div className="q-image">
          <img
            style={{ cursor: "pointer" }}
            onClick={() => setIsPreviewImage(true)}
            src={`data:image/jpeg;base64,${data.image}`}
            alt={data.description}
          />
          {isPreviewImage === true && (
            <Lightbox
              image={`data:image/jpeg;base64,${data.image}`}
              title={data.description}
              onClose={() => setIsPreviewImage(false)}
            ></Lightbox>
          )}{" "}
        </div>
      ) : (
        ""
      )}
      <div className="question">
        Question {index + 1}: {data.questionDescription}
      </div>
      <div className="answer">
        {data.answers &&
          data.answers.length > 0 &&
          data.answers.map((a, index) => {
            return (
              <div key={`answer-${index}`} className="a-child">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={a.isSelected} // kiem tra xem nguoi dung  co check hay chua
                    onChange={(event) => {
                      handleHandleCheckbox(a.id, data.questionId);
                    }}
                    id={`answer-${index}`}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`answer-${index}`}
                  >
                    {a.description}
                  </label>
                  {isShowAnswer === true && (
                    <>
                      {a.isSelected === true && a.isCorrect === false && (
                        <IoIosClose className="incorrect" />
                      )}

                      {a.isCorrect === true && (
                        <IoIosCheckmark className="correct" />
                      )}
                    </>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Question;

/*

sau khi chon dap an thi Question se chuyen answerId va questionId len DetailQuiz

DetailQuiz se tim dung Question do va cap nhat lai cau tra loi
*/
