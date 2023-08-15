import { useEffect, useState } from "react";
import { getAllQuiz } from "../../../../sevices/apiServices";
import { toast } from "react-toastify";

const TableQuiz = (props) => {
  const { handleClickBtnUpdate, handleClickBtnView, handleClickBtnDelete } =
    props;
  const [listQuiz, setListQuiz] = useState([
    {
      id: "1",
      name: "Bai test ky nang doc",
      description: "Khong doc cung lam duoc",
      image: "",
      difficulty: "EASY",
    },
    {
      id: "1",
      name: "Bai test ky nang doc",
      description: "Khong doc cung lam duoc",
      image: "",
      difficulty: "MEDIUM",
    },
    {
      id: "1",
      name: "Bai test ky nang doc",
      description: "Khong doc cung lam duoc",
      image: "",
      difficulty: "HARD",
    },
    {
      id: "1",
      name: "Bai test ky nang doc",
      description: "Khong doc cung lam duoc",
      image: "",
      difficulty: "EASY",
    },
    {
      id: "1",
      name: "Bai test ky nang doc",
      description: "Khong doc cung lam duoc",
      image: "",
      difficulty: "EASY",
    },
    {
      id: "1",
      name: "Bai test ky nang doc",
      description: "Khong doc cung lam duoc",
      image: "",
      difficulty: "EASY",
    },
    {
      id: "1",
      name: "Bai test ky nang doc",
      description: "Khong doc cung lam duoc",
      image: "",
      difficulty: "EASY",
    },
  ]);

  useEffect(() => {
    fetchQuiz();
  }, []);

  const fetchQuiz = async () => {
    let res = await getAllQuiz();
    if (res && res.EC === 0) {
      setListQuiz(res.DT);
    } else {
      toast.error(res.EC);
    }
  };
  return (
    <>
      <div>List Quizzes: </div>
      <table className="table table-hover table-bordered my-2">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Type</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {listQuiz &&
            listQuiz.length > 0 &&
            listQuiz.map((item, index) => {
              return (
                <tr key={`table-quiz-${index}`}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.difficulty}</td>
                  <td className="d-flex gap-10">
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        handleClickBtnView(item);
                      }}
                    >
                      View
                    </button>
                    <button
                      className="btn btn-warning mx-3"
                      onClick={() => handleClickBtnUpdate(item)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleClickBtnDelete(item)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

export default TableQuiz;
