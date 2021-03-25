import React from "react";

const CompanyShareTable = ({companyShare}) => {

    return (
        <React.Fragment>
            <table className="table table-borderless">
                <thead>
                <tr>
                    <th>Date</th>
                    <th>Company</th>
                    <th>Price</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>{companyShare.date}</td>
                    <td>{companyShare.company}</td>
                    <td>{companyShare.price}</td>
                </tr>
                </tbody>
            </table>
        </React.Fragment>
    )
};

export default CompanyShareTable