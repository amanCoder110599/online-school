import React, { Component, useState, useEffect } from "react";
import { Cookies } from "react-cookie";
import Cookies1 from "js-cookie";

export default class StudentDashboard extends Component {
  constructor() {
    super();
    this.state = {
      classrooms: [],
    };
  }
  async componentDidMount() {
    await fetch("/classrooms")
      .then((response) => response.json())
      .then((Classrooms) => {
        this.setState({ classrooms: Classrooms });
      });
  }
  classRoomList() {
    const classrooms = this.state.classrooms.map((classroom) => {
      return (
        <div>
          <a href={`/classroom/${classroom._id}`}>{classroom.subjectName}</a>
        </div>
      );
    });
    return classrooms;
  }
  render() {
    const { email, type } = this.props;
    return (
      <div>
        <h3>Welcome to our website</h3>
        <button
          onClick={() => {
            const cookies = new Cookies();
            cookies.remove("token", { path: "/", domain: "localhost" });
            this.props.history.push("/");
          }}
        >
          Logout
        </button>

        <div>{this.classRoomList()}</div>
      </div>
    );
  }
}
