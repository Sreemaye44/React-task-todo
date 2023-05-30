import React, { useEffect, useState } from "react";

const Problem1 = () => {
  const [show, setShow] = useState("all");
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [status, setStatus] = useState("");
  const [updatedTodo, setUpdatedTodo] = useState("");


  const statusOrder={
    active: 1,
    completed: 2,
    pending: 3,
    ' ':40
  }

  useEffect(() => {
    setUpdatedTodo(todos);
  }, [todos]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "todo") {
      setTodo(value);
    } else if (name === "status") {
      setStatus(value);
    }
  };
  const addTodo = (e) => {
    e.preventDefault();
    const newTodo = { todo, status };
    setTodos([...todos, newTodo]);


    setTodo("");
    setStatus("");
  };
  const handleClick = (val) => {
    setShow(val);
    if (val === undefined) {
      setUpdatedTodo(todos);
    }
    else if(val==='all'){

    const sorted = todos.sort((a, b) => {
      const statusA = statusOrder[a.status];
      const statusB = statusOrder[b.status];

      return statusA - statusB;
    });
     setUpdatedTodo(sorted)
    } else {
      setUpdatedTodo(todos.filter((todo) => todo.status === val));
    }
  };




  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-1</h4>
        <div className="col-6 ">
          <form
            className="row gy-2 gx-3 align-items-center mb-4"
            onSubmit={addTodo}
          >
            <div className="col-auto">
              <input
                type="text"
                name="todo"
                className="form-control"
                placeholder="Name"
                value={todo}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-auto">
              <input
                type="text"
                name="status"
                className="form-control"
                placeholder="Status"
                value={status}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="col-8">
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item">
              <button
                className={`nav-link ${show === "all" && "active"}`}
                type="button"
                onClick={() => handleClick("all")}
              >
                All
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "active" && "active"}`}
                type="button"
                onClick={() => handleClick("active")}
              >
                Active
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "completed" && "active"}`}
                type="button"
                onClick={() => handleClick("completed")}
              >
                Completed
              </button>
            </li>
          </ul>
          <div className="tab-content"></div>
          <table className="table table-striped ">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
              </tr>
              {updatedTodo &&
                updatedTodo?.map((todo, index) => (
                  <tr>
                    {" "}
                    <td>
                      {todo.todo}
                    </td>
                    <td>
                     {todo.status}
                    </td>
                  </tr>
                ))}
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </div>
      
    </div>
  );
};

export default Problem1;
