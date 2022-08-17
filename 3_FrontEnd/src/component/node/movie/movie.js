import React, {Component} from 'react';
import BaseNode from "../../../component/node/node";

export default class NodeMovie extends Component{
    constructor(props) {
        super(props);
        this.state = {
            txt: this.props.txt || "-",
            prebox: this.props.prebox,
            explore: this.props.explore || false,
            operation: this.props.operation || false,
            predicate: this.props.pre || "",
            type: "Movie"
        }
    }

    render() {
        return (
            <>
                <BaseNode txt={this.state.txt} prebox={this.state.prebox} operation={this.state.operation} explore={this.state.explore} predicate={this.state.predicate} type={this.state.type} />
            </>
        )
    }
}













