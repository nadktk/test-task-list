import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import classNames from "classnames";

const TasksListItem = ({ task }) => {
  const isHighPriority = task.is_high_priority;
  const nameClasses = classNames("ui header", {
    blue: !isHighPriority,
    orange: isHighPriority
  });
  const tags =
    task.tags !== undefined ? (
      <span>
        <i className="tag icon" />
        <span>{task.tags.join`, `}</span>
      </span>
    ) : (
      ""
    );

  return (
    <tr>
      <td>
        <Link to={`/details/${task.id}`} className={nameClasses}>
          {task.name}{" "}
          {isHighPriority ? <i className="flag icon small" /> : null}
        </Link>
      </td>
      <td>{tags}</td>
      <td className="ui header">{task.actual_effort}</td>
      <td className="ui header">{task.estimated_effort}</td>
      <td>
        {task.due_date ? (
          <Moment format="DD/MM/YYYY">{task.due_date}</Moment>
        ) : (
          "No date"
        )}
      </td>
    </tr>
  );
};

TasksListItem.propTypes = {
  task: PropTypes.object.isRequired
};

export default TasksListItem;
