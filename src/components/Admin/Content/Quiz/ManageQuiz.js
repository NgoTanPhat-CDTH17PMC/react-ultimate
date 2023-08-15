import { useState } from "react";
import "./ManageQuiz.scss";
import Select from "react-select";
import { postCreateNewQuiz } from "../../../../sevices/apiServices";
import { toast } from "react-toastify";
const options = [
  { value: "EASY", label: "EASY" },
  { value: "MEDIUM", label: "MEDIUM" },
  { value: "HARD", label: "HARD" },
];
const ManageQuiz = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("EASY");
  const [image, setImage] = useState(null);

  const handleChangeFilel = (event) => {
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
    <div className="quiz-container">
      <div className="title">Manage Quizzes</div>

      <hr />
      <div className="add-new">
        <fieldset className="border rounded-3 p-3">
          <legend className="float-none w-auto px-3">Add New Quiz</legend>
          <div class="form-floating mb-3">
            <input
              type="email"
              class="form-control"
              placeholder="Quiz name"
              value={name}
              onChange={(event) => event.target.value}
            />
            <label for="floatingInput">Name</label>
          </div>
          <div class="form-floating">
            <input
              type="text"
              class="form-control"
              placeholder="Quiz description"
              value={description}
              onChange={(event) => event.target.value}
            />
            <label for="floatingPassword">Description</label>
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
            <label className="mb-1">Upload image</label>
            <input
              type="file"
              className="form-control"
              onChange={(event) => handleChangeFile(event)}
            />
          </div>
          <div className="mt-3">
            <button
              className="btn btn-warning has-custom "
              onnClick={() => handleSubmitQuiz()}
            >
              Save
            </button>
          </div>
        </fieldset>
      </div>
      <div className="list-detail">Table</div>
    </div>
  );
};

export default ManageQuiz;
