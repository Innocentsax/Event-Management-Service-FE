import React, { useState } from "react";

function Input({ name, type, id, className, value, onChange }) {
  return (
    <fieldset className={className}>
      <legend>{name}</legend>
      <label htmlFor={id} className="input-label">
        <input
          type={type}
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          className="input-email"
        />
      </label>
    </fieldset>
  );
}

export default Input;
