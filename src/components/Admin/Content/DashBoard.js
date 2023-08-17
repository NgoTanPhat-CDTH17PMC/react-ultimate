import { useState } from "react";
import "./DashBoard.scss";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { getOverview } from "../../../sevices/apiServices";
/*
"DT": {
  "user": {
    "total": 13,
    "countUsers": 10,
    "countAdmin": 3
  },
  "others": {
    "countQuiz": 9,
    "countQuestions": 47,
    "countAnswers": 74
  }
},
"EC": 0,
"EM": "Get DashBoard Overview succeed!"
*/
const DashBoard = () => {
  const [dataOverview, setDataOverview] = useState({
    user: {
      total: 13,
      countUsers: 10,
      countAdmin: 3,
    },
    others: {
      countQuiz: 9,
      countQuestions: 47,
      countAnswers: 74,
    },
  });
  const [dataChart, setDataChart] = useState([]);

  useEffect(() => {
    fetchDataOverview();
  }, []);

  const fetchDataOverview = async () => {
    let Qz = 0,
      Qs = 0,
      As = 0;
    Qz = dataOverview?.others?.countQuiz ?? 0;
    Qs = dataOverview?.others?.countQuestions ?? 0;
    As = dataOverview?.others?.countAnswers ?? 0;

    const data = [
      {
        name: "Quizzes",
        Qz: Qz,
      },
      {
        name: "Questions",
        Qs: Qs,
      },
      {
        name: "Answers",
        As: As,
      },
    ];

    setDataChart(data);

    try {
      let res = await getOverview();
      if (res && res.EC === 0) {
        toast.success(res.EM);
        setDataOverview(res.DT);

        //process chart data
        let Qz = 0,
          Qs = 0,
          As = 0;
        Qz = res?.DT?.others?.countQuiz ?? 0;
        Qs = res?.DT?.others?.countQuestions ?? 0;
        As = res?.DT?.others?.countAnswers ?? 0;

        const data = [
          {
            name: "Quizzes",
            Qz: Qz,
          },
          {
            name: "Questions",
            Qs: Qs,
          },
          {
            name: "Answers",
            As: As,
          },
        ];

        setDataChart(data);
      } else {
        toast.error(res.EM);
      }
    } catch (e) {
      toast.error(e.message);
    }
  };
  return (
    <div className="dashboard-container container">
      <div className="title mb-3">Analytics Dashboard</div>
      <div className="content d-flex gap-2">
        <div className="c-left col-6 d-flex flex-wrap">
          <div className="child border rounded d-flex flex-column align-items-center justify-content-center">
            <span className="text-1">Total Users</span>
            <span className="text-2">
              {dataOverview &&
              dataOverview.users &&
              dataOverview.users.total ? (
                <>{dataOverview.users.total}</>
              ) : (
                <>0</>
              )}
            </span>
          </div>
          <div className="child border rounded d-flex flex-column align-items-center justify-content-center">
            <span className="text-1">Total Quizzes</span>
            <span className="text-2">
              {dataOverview &&
              dataOverview.others &&
              dataOverview.others.countQuiz ? (
                <>{dataOverview.others.countQuiz}</>
              ) : (
                <>0</>
              )}
            </span>
          </div>
          <div className="child border rounded d-flex flex-column align-items-center justify-content-center">
            <span className="text-1">Total Questions</span>
            <span className="text-2">
              {dataOverview &&
              dataOverview.others &&
              dataOverview.others.countQuestions ? (
                <>{dataOverview.others.countQuestions}</>
              ) : (
                <>0</>
              )}
            </span>
          </div>
          <div className="child border rounded d-flex flex-column align-items-center justify-content-center">
            <span className="text-1">Total Answers</span>
            <span className="text-2">
              {dataOverview &&
              dataOverview.others &&
              dataOverview.others.countAnswers ? (
                <>{dataOverview.others.countAnswers}</>
              ) : (
                <>0</>
              )}
            </span>
          </div>
        </div>
        <div className="c-right col-6">
          <ResponsiveContainer width="95%" height="100%">
            <BarChart data={dataChart}>
              {/* <CartesianGrid strokeDasharray="3 3" /> */}
              <XAxis dataKey="name" />
              {/* <YAxis /> */}
              <Tooltip />
              <Legend />
              <Bar dataKey="Qz" fill="#8884d8" />
              <Bar dataKey="Qs" fill="#82ca9d" />
              <Bar dataKey="As" fill="#fcb12a" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
