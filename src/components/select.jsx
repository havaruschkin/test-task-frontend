import React from "react";

const Select = ({name, label, options, error, handleChange}) => {
    return (
        <div className="form-group">
            <label
                htmlFor={name}>
                {label}
            </label>
            <select
                name={name}
                id={name}
                onChange={handleChange}
                className="form-control">
                <option value=""/>
                {options.map(option => (
                    <option key={option.id} value={option.id}>
                        {option.companyName}
                    </option>
                ))}
            </select>
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    );
};

export default Select;