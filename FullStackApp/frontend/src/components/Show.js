import { useState, useEffect } from "react";
// import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Show = () => {
  const [abc, setAbc] = useState([]);
  // const [text, setText] = useState("");
  const navigate = useNavigate();

  function handleDelete(id, e) {
    axios.delete(`http://localhost:5000/dc/${id}`).then((res) => {
      console.log(res.headers);
      console.log(res.status);
      console.log(res.data);
      // setText(res.data);
      // alert(text);
      navigate("/");
      axios.get("http://localhost:5000/dc").then((res) => {
        setAbc(res.data);
        console.log(res.data);
      });
      // <Navigate push to="/add" />;
    });
  }

  useEffect(() => {
    axios.get("http://localhost:5000/dc").then((res) => {
      setAbc(res.data);
      console.log(res.data);
    });
  }, []);

  return (
    <div className="my-3">
      <div className="container">
        <table className="table table-dark  table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {abc.map((a, key) => {
              return (
                <tr key={key}>
                  <td>{a.id}</td>
                  <td>{a.name}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={(e) => handleDelete(a.id, e)}
                    >
                      delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Show;
