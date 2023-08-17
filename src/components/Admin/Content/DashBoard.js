import "./DashBoard.scss";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";
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
  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
    },
  ];
  return (
    <div className="dashboard-container container">
      <div className="title">Analytics Dashboard</div>
      <div className="content d-flex">
        <div className="c-left col-6 d-flex flex-wrap">
          <div className="child border col-6 d-flex align-items-center justify-content-center">
            Total Users
          </div>
          <div className="child border col-6 d-flex align-items-center justify-content-center">
            Total Quizzes
          </div>
          <div className="child border col-6 d-flex align-items-center justify-content-center">
            Total Questions
          </div>
          <div className="child border col-6 d-flex align-items-center justify-content-center">
            Total Answers
          </div>
        </div>
        <div className="c-right col-6">
          <BarChart width={400} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pv" fill="#8884d8" />
            <Bar dataKey="uv" fill="#82ca9d" />
          </BarChart>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
