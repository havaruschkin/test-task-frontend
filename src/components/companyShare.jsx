import React, {Component} from "react";
import {getCompanyShare, updateCompanyShare} from "../services/companyShareService";
import CompanyShareTable from "./companyShareTable";
import ModalWindow from "./modalWindow";
import {getCompanies} from "../services/coppanyService";
import Schedule from "./schedule";
import _ from "lodash";

class CompanyShare extends Component {
    state = {
        companyShare: [],
        companyShareForSchedule: [],
        companies: [],
        show: false,
        editIdx: -1,
        share: {
            id: "", date: "", price: "", company: ""
        },
        color: ['#b58c10', '#eb0932', '#05e632', '#071073', '#0cede9']
    };

    async componentDidMount() {
        await this.initCompanyShare();
        await this.initCompanies();
    }

    async initCompanyShare() {
        const {data: companyShare} = await getCompanyShare();
        this.setState({
            companyShare,
            companyShareForSchedule: this.mapToViewModel(companyShare)})
    }

    async initCompanies() {
        const {data: companies} = await getCompanies();
        this.setState({companies});
    }

    handleClick = () => {
        this.state.show ?
            this.setState({show: false}) :
            this.setState({show: true})
    }

    handleUpdate = () => {
        this.initCompanyShare()
    };

    handleChange = ({currentTarget: input}) => {
        const share = {...this.state.share};
        share[input.name] = input.value;
        this.setState({share});
    }

    startEditing = (i, shareEdit) => {
        const share = {
            id: shareEdit.id,
            date: shareEdit.date,
            price: shareEdit.price,
            company: shareEdit.companyDto.id
        };
        this.setState({editIdx: i, share: share});
    };

    stopEditing = () => {
        this.handleSaveCompanyShare();
        this.setState({editIdx: -1});
        this.initCompanyShare();
    };

    canselEditing = () => {
        this.setState({editIdx: -1});
    }

    handleSaveCompanyShare = async () => {
        const {company, date, price, id} = this.state.share;
        const companies = this.state.companies;
        const [companyDto] = companies.filter(f => f.id === +company);
        const compositionShare = {
            id: id,
            date: date,
            companyDto,
            price: price
        }
        await updateCompanyShare(compositionShare);
        this.initCompanyShare();
    }

    dateToString(companyShare) {
        return companyShare.map(share => (
            {
                date: new Date(share.date).toISOString().substr(0, 10),
                id: share.id,
                price: share.price,
                company: share.companyDto
            }
        ));
    }

    mapToViewModel(companyShare) {
        const model = this.dateToString(companyShare)
        const companyShareSorted = _.orderBy(model, ['date'], ['asc'])
        return companyShareSorted.map(share => (
            {
                name: share.date,
                [share.company.companyName]: share.price
            }
        ));
    }

    render() {
        const {
            companyShare,
            show,
            companies,
            editIdx,
            share,
            color,
            companyShareForSchedule} = this.state;

        return (
            <div>
                <Schedule
                    color={color}
                    companyShareForSchedule={companyShareForSchedule}
                    companies={companies}/>
                <button className="btn btn-info" onClick={this.handleClick}
                        style={{marginBottom: "20px"}}>
                    Add
                </button>
                <ModalWindow
                    show={show}
                    handleClose={this.handleClick}
                    handleUpdate={this.handleUpdate}
                />
                <CompanyShareTable
                    companyShare={companyShare}
                    options={companies}
                    startEditing={this.startEditing}
                    stopEditing={this.stopEditing}
                    canselEditing={this.canselEditing}
                    editIdx={editIdx}
                    handleChange={this.handleChange}
                    shareEdit={share}
                />
            </div>
        )
    }
}

export default CompanyShare