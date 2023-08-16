import { useState } from "react";
import "./ManageQuizzes.scss";
import Select from "react-select";
import { postCreateNewQuiz } from "../../../../sevices/apiServices";
import { toast } from "react-toastify";
import TableQuiz from "./TableQuiz";
import { FcPlus } from "react-icons/fc";
import Accordion from "react-bootstrap/Accordion";
import QuizQA from "./QuizQA";
import AssignQuiz from "./AssignQuiz";

const ManageQuiz = () => {
  const options = [
    { value: "EASY", label: "EASY" },
    { value: "MEDIUM", label: "MEDIUM" },
    { value: "HARD", label: "HARD" },
  ];
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("EASY");
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  const handleChangeFile = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setPreviewImage(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]);
    }
  };

  const handleSubmitQuiz = async () => {
    //validate
    if (!name || !description) {
      toast.error("Name/Description is required!");
      return;
    }
    let res = await postCreateNewQuiz(description, name, type?.value, image);

    if (res && res.EC === 0) {
      toast.success(res.EM);
      setName("");
      setDescription("");
      setImage(null);
    } else {
      toast.error(res.EM);
    }
  };
  return (
    <div className="quiz-container container">
      <Accordion defaultActiveKey={0}>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Manage Quizzes</Accordion.Header>
          <Accordion.Body>
            <div className="add-new">
              <fieldset className="border rounded-3 p-3">
                <legend className="float-none w-auto px-3">Add New Quiz</legend>
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Quiz name"
                    value={name}
                    onChange={(event) => event.target.value}
                  />
                  <label htmlFor="floatingInput">Name</label>
                </div>
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Quiz description"
                    value={description}
                    onChange={(event) => event.target.value}
                  />
                  <label htmlFor="floatingPassword">Description</label>
                </div>
                <div className="my-3">
                  <Select
                    value={type}
                    defaultValue={type}
                    onChange={setType}
                    option={options}
                    placeholder="Quiz type..."
                  />
                </div>
                <div className="more-actions form-group">
                  <label
                    className="mb-1 form-label label-upload"
                    htmlFor="labelUpload"
                  >
                    <FcPlus /> Upload image
                  </label>
                  <input
                    id="labelUpload"
                    type="file"
                    className="form-control"
                    onChange={(event) => handleChangeFile(event)}
                    hidden
                  />
                </div>
                <div className="img-preview">
                  {previewImage ? (
                    <img src={previewImage} />
                  ) : (
                    <span>Preview Image</span>
                  )}
                </div>
                <div className="mt-3">
                  <button
                    className="btn btn-warning has-custom "
                    onClick={() => handleSubmitQuiz()}
                  >
                    Save
                  </button>
                </div>
              </fieldset>
            </div>
            <div className="list-detail">
              <TableQuiz />
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Update Q/A Quizzes</Accordion.Header>
          <Accordion.Body>
            <QuizQA />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>Assign Quiz to Users</Accordion.Header>
          <Accordion.Body>
            <AssignQuiz />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default ManageQuiz;
