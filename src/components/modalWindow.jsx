import React, {Component} from "react";
import {Modal} from "react-bootstrap";
import Input from "./input";
import {saveCompanyShare} from "../services/companyShareService";
import {getCompanies} from "../services/coppanyService";
import Select from "./select";

class ModalWindow extends Component {

    state = {
        share: {
            date: "", price: "", company: ""
        },
        errors: {},
        companies: {}
    };

    async componentDidMount() {
        await this.init()
    }

    async init() {
        const {data: companies} = await getCompanies();
        this.setState({companies});
    }

    validate = () => {
        const errors = {};
        const {share} = this.state;
        if (share.date.trim() === "")
            errors.date = "Date is required.";
        if (share.company.trim() === "")
            errors.company = "Company is required.";
        if (share.price.trim() === "")
            errors.price = "Price is required.";
        return Object.keys(errors).length === 0 ? null : errors;
    };

    validateProperty = ({name, value}) => {
        if (name === "date") {
            if (value.trim() === "") return "Date is required.";
        }
        if (name === "company") {
            if (value.trim() === "") return "Company is required.";
        }
        if (name === "price") {
            if (value.trim() === "") return "Price is required.";
        }
    };

    handleSubmit = e => {
        e.preventDefault();
        const errors = this.validate();
        this.setState({errors: errors || {}});
        if (errors) return;
        this.doSubmit();
    }

    handleChange = ({currentTarget: input}) => {
        const errors = {...this.state.errors};
        const errorMessage = this.validateProperty(input);
        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];

        const share = {...this.state.share};
        share[input.name] = input.value;
        this.setState({share, errors});
    }

    doSubmit = async () => {
        const {date, price, company} = this.state.share;
        const companies = this.state.companies;
        const [companyDto] = companies.filter(f => f.id === +company);
        const compositionShare = {
            date: new Date(date),
            companyDto,
            price: price
        }
        await saveCompanyShare(compositionShare)
        this.handleClean();
        this.props.handleClose();
        this.props.handleUpdate();
    }

    handleClean = () => {
        const share = {
            date: "",
            company: "",
            price: ""
        }
        this.setState({share})
    }

    render() {
        const show = this.props.show;
        const {share, errors, companies} = this.state;

        return (
            <div>
                <Modal show={show} onHide={this.props.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add company share</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={this.handleSubmit}>
                            <Input
                                label="Enter date"
                                type="date"
                                handleChange={this.handleChange}
                                value={share.date}
                                name="date"

                            />
                            <Select
                                name="company"
                                label="Enter company"
                                options={companies}
                                handleChange={this.handleChange}
                                error={errors.company}
                            />
                            <Input
                                label="Enter price"
                                type="number"
                                handleChange={this.handleChange}
                                value={share.price}
                                name="price"
                                error={errors.price}
                            />
                            <button
                                className="btn btn-primary"
                                disabled={this.validate()}
                            >
                                Save company share
                            </button>
                        </form>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}

export default ModalWindow