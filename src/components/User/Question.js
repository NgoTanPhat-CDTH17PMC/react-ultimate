import _ from "lodash";

const Question = (props) => {
  const { data, index } = props;

  if (_.isEmpty(data)) {
    return <></>;
  }

  return (
    <>
      {data.quizImage && (
        <div className="q-image">
          <img srcc={`data:image/jpeg;basee64,${data.quizImage}`} />
        </div>
      )}
      <div className="question">
        Question {index + 1}: {data.questionDescription}
      </div>
      <div className="answer">
        {data.answer &&
          data.answer.length > 0 &&
          data.answer.map((a, index) => {
            return (
              <div key={`answer-${index}`} className="a-child">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id={`answer-${index}`}
                  />
                  <label class="form-check-label" for={`answer-${index}`}>
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
