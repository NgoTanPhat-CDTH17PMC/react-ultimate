import { useState } from "react";
import Select from "react-select";
import "./Question.scss";
import { BsFillPatchPlusFill, BsFillPatchMinusFill } from "react-icons/bs";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";

const Question = (props) => {
  const options = [
    { value: "test", label: "test" },
    { value: "test", label: "test" },
  ];

  const [selectedQuiz, setSelectedQuiz] = useState({});

  return (
    <div className="question-container containenr">
      <div className="title">Manage Question</div>
      <div className="add-new-question">
        <div className="col-6 form-group">
          <label>Select Quiz:</label>
          <Select
            defaultValue={selectedQuiz}
            onChange={setSelectedQuiz}
            options={options}
          />
        </div>
        <div className="mt-3 ">Add Question:</div>
        <div className="questions-content">
          <div className="form-floating description">
            <input
              type="text"
              className="form-control"
              placeholder="Description"
              value={""}
              onChange={(event) => event.target.value}
            />
            <label htmlFor="floatingInput">Description</label>
          </div>
          <div className="group-upload">
            <label className="label-up">Upload Image</label>
            <input type={"file"} hidden />
            <span>0 file is uploaded</span>
          </div>
          <div className="btn-add">
            <span>
              <BsFillPatchPlusFill className="icon-add" />
            </span>
            <span>
              <BsFillPatchMinusFill className="icon-remove" />
            </span>
          </div>
        </div>
        <div className="answers-content">
          <input className="form-check-input isCorrect" type="checkbox" />
          <div className="form-floating answer-name">
            <input
              type="text"
              className="form-control"
              placeholder="Description"
              value={""}
              onChange={(event) => event.target.value}
            />
            <label htmlFor="floatingInput">Answer 1</label>
          </div>
          <div className="btn-group">
            <span>
              <AiOutlinePlusCircle className="icon-add" />
            </span>
            <span>
              <AiOutlineMinusCircle className="icon-remove" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Question;
