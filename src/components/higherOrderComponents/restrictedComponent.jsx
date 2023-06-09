import React from "react";
import { roles } from "../../utils/constants";

const RestrictedComponent = ({ user, Component }) => {
  const hasAccess = user && roles.all.includes(user);

  if (hasAccess) {
    return <Component />;
  }
  return null;
};

export default RestrictedComponent;
