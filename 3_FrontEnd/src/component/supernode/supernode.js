import React, {Component} from 'react';
import "../../component/supernode/supernode.css"

export default class Supernode extends Component {

    constructor(props) {
        super(props);
        this.state = {
            amount: this.props.amount,
            isShow: false
        }
    }

    onSuperNodeClick(){
        this.setState({isShow: !this.state.isShow});
    }

    render() {
        return (
            <>
                <div className="node-supernode">
                    {/*<div className="con-node-supernode show">*/}
                    <div className={"con-node-supernode " + (this.state.isShow ? "show":"")}>
                        <div className="bar-supernode" onClick={()=>this.onSuperNodeClick()}>
                            <div className="btn-show-supernode">
                                Hide the following {this.state.amount} items
                            </div>
                            <div className="btn-hidden-supernode">
                                Show More {this.state.amount} items
                            </div>
                        </div>
                        <div className="box-supernode-children">
                            {this.props.children}
                        </div>

                    </div>
                </div>
            </>
        )
    }
}















