import React from "react";

const CompanyShareTable =
    ({
         companyShare,
         handleChange,
         editIdx,
         options,
         stopEditing,
         startEditing,
         shareEdit,
         canselEditing
     }) => {
        const defaultDate = new Date(shareEdit.date);
        defaultDate.setDate(defaultDate.getDate() + 1)

        return (
            <React.Fragment>
                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th>Date</th>
                        <th>Company</th>
                        <th>Price</th>
                        <th>Edit</th>
                    </tr>
                    </thead>
                    <tbody>
                    {companyShare.map((share, i) => (
                        <tr key={share.id}>
                            <td>
                                {editIdx === i ? (
                                    <input
                                        className="form-control"
                                        type="date"
                                        name="date"
                                        defaultValue={
                                            new Date(defaultDate)
                                                .toISOString()
                                                .substr(0, 10)
                                        }
                                        onChange={handleChange}
                                    />
                                ) : (
                                    new Date(share.date).toLocaleDateString()
                                )}
                            </td>
                            <td>
                                {editIdx === i ? (
                                    <select
                                        id="company"
                                        className="form-control"
                                        name="company"
                                        onChange={handleChange}>
                                        <option value=""/>
                                        {options.map(option => (
                                            <option key={option.id} value={option.id}>
                                                {option.companyName}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    share.companyDto.companyName
                                )}
                            </td>
                            <td>
                                {editIdx === i ? (
                                    <input
                                        className="form-control"
                                        type="number"
                                        value={shareEdit.price}
                                        name="price"
                                        onChange={handleChange}
                                    />
                                ) : (
                                    share.price
                                )}
                            </td>
                            <td>
                                {editIdx === i ? (
                                    <div>
                                        <button className="btn btn-outline-blue m-1"
                                                onClick={() => stopEditing()}>
                                            Save
                                        </button>
                                        <button className="btn btn-outline-amber"
                                                onClick={() => canselEditing()}>
                                            Cancel
                                        </button>
                                    </div>
                                ) : (
                                    <button className="btn btn-outline-blue"
                                            onClick={() => startEditing(i, share)}>
                                        Edit
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </React.Fragment>
        )
    };

export default CompanyShareTable
