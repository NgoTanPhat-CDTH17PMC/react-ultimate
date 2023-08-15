import _ from "lodash";

const Question = (props) => {
  const { data, index } = props;

  if (_.isEmpty(data)) {
    return <></>;
  }

  const handleHandleCheckbox = (event, aId, qId) => {
    props.handleCheckbox(aId, qId); // day len cho compoent cha xu ly
  };

  return (
    <>
      <div className="q-image">
        {data.quizImage && (
          <img srcc={`data:image/jpeg;basee64,${data.quizImage}`} />
        )}
      </div>

      <div className="question">
        Question {index + 1}: {data.questionDescription}
      </div>
      <div className="answer">
        {data.answer &&
          data.answer.length > 0 &&
          data.answer.map((a, index) => {
            return (
              <div key={`answer-${index}`} className="a-child">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={a.isSelected} // kiem tra xem nguoi dung  co check hay chua
                    onChange={(event) => {
                      handleHandleCheckbox(event, a.id, data.questionId);
                    }}
                    id={`answer-${index}`}
                  />
                  <label className="form-check-label" for={`answer-${index}`}>
                    {a.description}
                  </label>
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
