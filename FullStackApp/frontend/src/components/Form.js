import axios from "axios";
import { useState, useEffect, useRef } from "react";

const Form = () => {
  const [id, setId] = useState();
  const [hero, setHero] = useState("");
  const [statement, setStatement] = useState("");
  const xyz = useRef();

  // xyz.current.style.backgroundColor = "blue";

  const submit = (e) => {
    // xyz.current.style.display = "block";
    xyz.current.classList.add("alert");
    xyz.current.classList.add("alert-danger");

    e.preventDefault();
    if (hero === "" && id !== "") {
      setStatement("Hero can't be empty");
    } else if (id === "" && hero !== "") {
      setStatement("ID can't be empty");
    } else if (id === "" && hero === "") {
      setStatement("ID and Hero can't be empty");
    } else {
      axios
        .post("http://localhost:5000/dc", { id: id, name: hero })
        .then((res) => {
          console.log(res);
          setStatement(res.data);
          setId("");
          setHero("");
        })
        .catch((err) => {
          console.log(err);
          // setStatement(err);
        });
    }
  };

  useEffect(() => {
    console.log(id, hero);
  });

  const handleChange = (e) => {
    if (e.target.name === "id") {
      setId(e.target.value);
    } else {
      setHero(e.target.value);
    }
  };

  return (
    <div className="my-3">
      <div className="container">
        <form>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">
              Enter ID
            </label>
            <input
              type="email"
              value={id}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="id"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">
              Enter Hero Name
            </label>
            <input
              type="text"
              value={hero}
              className="form-control"
              id="exampleInputPassword1"
              name="hero"
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary" onClick={submit}>
            Submit
          </button>
        </form>
        <div ref={xyz}>{statement}</div>
      </div>
    </div>
  );
};

export default Form;
