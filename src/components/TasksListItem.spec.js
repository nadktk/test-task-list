import React from "react";
import { shallow } from "enzyme";
import TasksListItem from "./TasksListItem";

describe("Tasks List Item Component", () => {
  const nextProps = {
    key: 1,
    task: {
      id: 1,
      name: "Today_task1",
      due_date: "2015-04-22T23:59:00",
      estimated_effort: 5.5,
      actual_effort: 3.3
    }
  };

  it("shows table row with tasks data", () => {
    const tasksListItem = shallow(<TasksListItem {...nextProps} />);
    expect(tasksListItem.is("tr")).toBeTruthy;
  });

  it("shows table row with tasks data", () => {
    const tasksListItem = shallow(<TasksListItem {...nextProps} />);
    expect(tasksListItem.children().length).toEqual(5);
  });
});

// to be continued...
