import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getHistory } from "../../sevices/apiServices";
import moment from "moment";
/*
DT: {
data : [
    {
      id: 1,
      participant_id: 2,
      quiz_id: 1,
      total_questions: 1,
      total_correct: 3,
      quizHistory: {
        id: 1,
        name: "Bai test ky nang doc",
        description: "khong doc cung lam duoc",
      },
      createAt: "2022-08-04T15:13:07.00Z",
      deleteAT: null,
      updateAdd: "2022-08-04T15:13:07.00Z",
    },
    {
      id: 2,
      participant_id: 2,
      quiz_id: 1,
      total_questions: 1,
      total_correct: 3,
      quizHistory: {
        id: 1,
        name: "Bai test ky nang doc",
        description: "khong doc cung lam duoc",
      },
      createAt: "2023-08-04T15:13:07.00Z",
      deleteAT: null,
      updateAdd: "2022-08-04T15:13:07.00Z",
    },
]
}
EC: 0,
EM: "Get History succeed!";
*/

const History = (props) => {
  const fakeData = [
    {
      id: 1,
      participant_id: 2,
      quiz_id: 1,
      total_questions: 1,
      total_correct: 3,
      quizHistory: {
        id: 1,
        name: "Bai test ky nang doc",
        description: "khong doc cung lam duoc",
      },
      createAt: "2022-08-04T15:13:07.00Z",
      deleteAT: null,
      updateAdd: "2022-08-04T15:13:07.00Z",
    },
    {
      id: 2,
      participant_id: 2,
      quiz_id: 1,
      total_questions: 1,
      total_correct: 3,
      quizHistory: {
        id: 1,
        name: "Bai test ky nang doc",
        description: "khong doc cung lam duoc",
      },
      createAt: "2023-08-04T15:13:07.00Z",
      deleteAT: null,
      updateAdd: "2022-08-04T15:13:07.00Z",
    },
  ];
  const [listHistory, setListHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    let newData = fakeData.map((item) => {
      return {
        total_correct: item.total_correct,
        total_questions: item.total_questions,
        name: item?.quizHistory?.name ?? "",
        id: item.id,
        date: moment(item.createAt).utc().format("DD/MM/YYYY hh:mm:ss"),
      };
    });
    if (newData.length > 7) {
      newData = newData.slice(newData.length - 7, newData.length);
      // lay 7 phan tu cuoi cung cua mang
    }
    setListHistory(newData);
    try {
      let res = await getHistory();
      if (res && res.EC === 0) {
        let newData = res?.DT?.data?.map((item) => {
          return {
            total_correct: item.total_correct,
            total_questions: item.total_questions,
            name: item?.quizHistory?.name ?? "",
            id: item.id,
            date: moment(item.createAt).utc().format("DD/MM/YYYY hh:mm:ss"),
          };
        });
        if (newData.length > 7) {
          newData = newData.slice(newData.length - 7, newData.length);
        }
        setListHistory(newData);
      }
    } catch (e) {
      toast.error(e.message);
    }
  };
  return (
    <>
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Quiz Name</th>
            <th>Total Question</th>
            <th>Total Correct</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {listHistory &&
            listHistory.length > 0 &&
            listHistory.map((item, index) => {
              return (
                <tr key={`table-users-${index}`}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.total_questions}</td>
                  <td>{item.total_correct}</td>
                  <td>{item.date}</td>
                </tr>
              );
            })}
          {listHistory && listHistory.length === 0 && (
            <tr>
              <td colSpan={4}>Not Found Date</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};
export default History;
