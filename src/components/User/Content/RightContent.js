import CountDown from "./CounDown";

const RightContent = (props) => {
  const { dataQuiz, handleFinishQuiz } = props;

  const timeUp = () => {
    handleFinishQuiz();
  };

  return (
    <>
      <div className="main-timer">
        <CountDown timeUp={timeUp} />
      </div>
      <div className="main-question">
        {dataQuiz &&
          dataQuiz.length > 0 &&
          dataQuiz.map((item, index) => {
            return <div className="question">{index + 1}</div>;
          })}
      </div>
    </>
  );
};
export default RightContent;
