import React from "react";
import "./App.css";
// import Tune from "./assets/audio/Tune.mp3"
// import ReactAudioPlayer from 'react-audio-player';
import ShakaPlayer from "shaka-player-react";
import "shaka-player-react/dist/controls.css";
import Tune1 from "./assets/audio/Tune.mp3";

import {
  AiOutlineArrowUp,
  AiOutlineArrowDown,
  AiTwotoneDelete,
  AiTwotoneEdit,
  AiOutlineCheck,
} from "react-icons/ai";

class App extends React.Component {
  state = {
    input: { todo: "", time: null },
    todo: [],
    new_index: null,
    for_submit: "Show",
    for_update: "Hide",
    muted: true,
    output: "audio_hide",
  };
  handleinput = (e) => {
    // this.setState({ input: e.target.value });
    // console.log(e.target.name,e.target.value);
    // console.log({[e.target.name]:e.target.value})
    this.setState({
      input: { ...this.state.input, [e.target.name]: e.target.value },
    });
  };

  handleSubmit = () => {
    let arr = this.state.todo;
    let inp = this.state.input;
    let time = this.state.input.time;
    if (inp.todo == 0) {
      alert("enter something");
    } else {
      arr.push(this.state.input);
      this.setState({ todo: arr, input: { todo: "", time: "" } });
    }
  };
  handleUp = (index) => {
    if (index == 0) {
      alert("you are already at highest index");
    } else {
      let arr = this.state.todo;
      let temp = arr[index];
      arr[index] = arr[index - 1];
      arr[index - 1] = temp;
      this.setState({ todo: arr });
    }
  };
  handleDown = (index) => {
    let arr = this.state.todo;

    if (index == arr.length - 1) {
      alert("you are already at minumum index");
    } else {
      let arr = this.state.todo;
      let temp = arr[index];
      arr[index] = arr[index + 1];
      arr[index + 1] = temp;
      this.setState({ todo: arr });
    }
  };
  handleDel = (index) => {
    let arr = this.state.todo;
    arr.splice(index, 1);
    this.setState({ todo: arr, input: "" });
  };
  handleEdit = (index) => {
    let arr = this.state.todo;
    let inp = this.state.input;
    inp = arr[index];
    this.setState({
      input: inp,
      for_update: "Show",
      for_submit: "Hide",
      new_index: index,
    });
  };
  handleUpdate = (index) => {
    let arr = this.state.todo;

    if (this.state.input.todo == 0) {
      alert("your input is empty");
    } else {
      arr[this.state.new_index] = this.state.input;

      this.setState({
        todo: arr,
        for_update: "Hide",
        for_submit: "Show",
        input: { todo: "", time: "" },
      });
    }
  };

  timer = () => {
    let arr = this.state.todo;
    arr.map((element, index) => {
      let pc_time = new Date().toLocaleTimeString();
      let [hrs, mint, sec] = pc_time.split(":");
      let inp_time = element.time;
      let [hr, min] = inp_time.split(":");

      // console.log(hr,min);
      let hr_result = hrs - hr;
      let min_result = mint - min;

      // console.log(hr_result,min_result);
      if (hrs == hr && mint == min) {
        this.setState({ muted: false, output: "output_show" });
      }
    });
  };
  componentDidMount() {
    setInterval(this.timer);
  }

  // componentDidUnMount(){
  //   console.log("unmount");
  //   clearInterval(this.timer)

  // }
  handleOk = () => {
    this.setState({ muted: true, output: "output_hide" });
  };

  render() {
    console.log(this.state, "test");
    let res = this.state.todo.map((element, index) => {
      return (
        <tr className="w-50 text-center">
          <th scope="row">({index + 1})</th>
          <td>{element.todo}</td>
          <td>{element.time}</td>

          <td>
            {" "}
            <div className="btn-group">
              <button
                type="button"
                class="btn btn-success mx-2 "
                onClick={() => {
                  this.handleUp(index);
                }}
              >
                <AiOutlineArrowUp />
              </button>
              <button
                type="button"
                class="btn btn-danger mx-2 "
                onClick={() => {
                  this.handleDown(index);
                }}
              >
                <AiOutlineArrowDown />
              </button>
              <button
                type="button"
                class="btn btn-info mx-2"
                onClick={() => {
                  this.handleEdit(index);
                }}
              >
                <AiTwotoneEdit />
              </button>
              <button
                type="button"
                class="btn btn-warning mx-2"
                onClick={() => {
                  this.handleDel(index);
                }}
              >
                <AiTwotoneDelete />
              </button>
            </div>
          </td>
        </tr>
      );
    });
    return (
      <>
        <div
          className={`${this.state.output}  alert alert-success d-flex align-items-center container justify-content-center`}
          role="alert"
        >
          <AiOutlineCheck className="me-3 bg-info" />

          <div>
            your alarm has been triggered..... you can close it after 1 minute
            <a
              href="#"
              className=" btn btn-primary ms-5"
              onClick={this.handleOk}
            >
              OK
            </a>
          </div>
        </div>
        <div className="container bg-info rounded pb-1 mt-5">
          <div className="container-fluid d-flex justify-content-center flex-column align-items-center py-2 my-3 ">
            {" "}
            <h1 className="mb-4 text-danger">TO-DO LIST</h1>
            {/* <audio src="../public/Tune.mp3" autoPlay ></audio> */}
            <div className="">
              <div class="input-group m-0 p-0">
                <input
                  type="text"
                  maxLength="30"
                  class="w-50 form-control "
                  placeholder="Input Something Here....."
                  aria-label="Recipient's username with two button addons"
                  value={this.state.input.todo}
                  onChange={this.handleinput}
                  name="todo"
                />

                <input
                  type="time"
                  onChange={this.handleinput}
                  value={this.state.input.time}
                  name="time"
                  style={{
                    marginLeft: "10px",
                    outline: "none",
                    border: "none",
                  }}
                />
                <button
                  class={`${this.state.for_submit} btn btn-outline-secondary ms-2`}
                  type="button"
                  onClick={this.handleSubmit}
                >
                  Submit
                </button>
                <button
                  class={`${this.state.for_update} btn btn-outline-secondary ms-2`}
                  type="button"
                  onClick={this.handleUpdate}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
          <div className="container-fluid d-flex justify-content-center align-item-center ">
            <table class="table table-dark table-hover w-50">
              <thead className=" text-center">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">DATA</th>
                  <th scope="col">Time</th>
                  <th scope="col" className=" text-center">
                    FUNCTION
                  </th>
                </tr>
              </thead>
              <tbody className="">{res}</tbody>
            </table>
          </div>

          <div className="container">
            <ShakaPlayer
              autoPlay
              muted={this.state.muted}
              src={Tune1}
              loop
              className="audio_hide"
            />
            ;
          </div>
        </div>
      </>
    );
  }
}

export default App;
