import React from "react";

const RestrictedComponent = ({ user, Component }) => {
  const hasAccess = user !== 4;
  if (hasAccess) {
    return <Component />;
  }
  return null;
};

export default RestrictedComponent;
