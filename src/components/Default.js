import React from "react";
import { Link } from "react-router-dom";

export default function() {
  return (
    <div className="ui vertical segment">
      <div className="ui container  center aligned">
        <h1 className="ui header">Page not found</h1>
        <Link to="/" className="ui button primary">
          Back to Tasks List
        </Link>
      </div>
    </div>
  );
}
