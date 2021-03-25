import React, {Component} from "react";
import {getCompanyShare} from "../services/companyShareService";
import CompanyShareTable from "./companyShareTable";

class CompanyShare extends Component {
    state = {
        companyShare: []
    };

    async componentDidMount() {
        await this.init()
    }

    async init() {
        const {data: users} = await getCompanyShare();
        this.setState({users});
    }

    render() {
        const companyShare = this.state.companyShare;

        return (
            <div className="row">
                <CompanyShareTable
                    companyShare={companyShare}
                />
            </div>
        )
    }
}

export default CompanyShare