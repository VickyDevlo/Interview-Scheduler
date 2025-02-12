import React from "react";

export const InputField = ({
  label,
  type,
  name,
  value,
  onChange,
  className,
  ...rest
}) => {
  return (
    <div>
      <label htmlFor={name} className="block font-medium max-md:text-sm text-gray-500 mb-1">
        {label}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required
        {...rest}
        className={`${className} border border-gray-300 p-2 w-full rounded focus:outline-0`}
      />
    </div>
  );
};
