import React from "react";

const Input = ({label, type, handleChange, value, name, error}) => {

    return (
        <div className="form-group">
            <label
                htmlFor={name}>
                {label}
            </label>
            <input
                id={name}
                type={type}
                className="form-control"
                name={name}
                onChange={handleChange}
                value={value}
            />
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    )
}

export default Input
