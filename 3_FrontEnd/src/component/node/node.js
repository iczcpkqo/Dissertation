import React, {Component} from 'react';
import "../../component/node/node.css"

export default class BaseNode extends Component {

    constructor(props) {
        super(props);
        this.state = {
            txt: this.props.txt || "-",
            prebox: this.props.prebox || "",
            explore: this.props.explore || false,
            operation: this.props.operation || false,
            predicate: this.props.predicate || "",
            type:  this.props.type ? this.props.type.slice(0,1).toUpperCase() + this.props.type.slice(1).toLowerCase()  : "",

            delBtnName: this.props.delBtnName,
            onGetChildMargin: this.props.onGetChildMargin || "",
            onNodeClick: this.props.onNodeClick || "",
            onNodeDeleteClick: this.props.onNodeDeleteClick || "",
            onNodeExploreClick: this.props.onNodeExploreClick || "",
            onNodeDialogueClick: this.props.onNodeDialogueClick || ""
    }

        this.state["path"] = this.props.path ? this.props.path.concat({
                predicate: this.state.predicate,
                type: this.state.type,
                txt: this.state.txt
            })
            :
            [{
                predicate: this.state.predicate,
                type: this.state.type,
                txt: this.state.txt
            }];


    }

    explorationNode(){
        console.log("the explore node");

    }

    upSender(){
        this.state.onNodeClick(this.state.path);
    }


    onClick(e){
        this.state.explore && this.explorationNode();
        // this.state.onGetChildMargin && this.upMyMargin();
        this.state.onNodeClick && this.upSender();
    }

    render() {
        return (
            <div className={"basenode " + (this.state.type && "n-"+this.state.type.toLowerCase()) }
            >
                <div className={"node"
                                + (this.state.explore ? " exploration" : "")
                                + (this.state.operation ? " operation" : "")
                }
                     onClick={(e)=>this.onClick(e)}
                >
                    {(()=>{
                        if(this.state.predicate)
                            return (
                                <div className="n-predicate" >
                                    <div className="n-con">
                                        <div className="con-txt">
                                            <label>
                                                {this.state.predicate}
                                            </label>
                                        </div>
                                        <div className="con-arr">
                                        </div>
                                    </div>
                                </div>
                            )
                    })()}
                    <div className="n-type" >
                        <div>
                            { this.state.type || "Node"}
                        </div>
                    </div>
                    <div className="n-obj">
                        <div>
                            {this.state.txt}
                        </div>
                    </div>


                    <div className="exploration-box">
                        <div className="n-predicate">
                            <div className="n-con">
                                <div className="con-txt">
                                    Investss
                                </div>
                                <div className="con-arr">
                                </div>
                            </div>
                            <div className="n-con">
                                <div className="con-txt">
                                    Invest
                                </div>
                                <div className="con-arr">
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="operation-box">
                        <div className="n-oper">
                            <div className="oper"
                                 onClick={(e)=>this.state.onNodeDeleteClick(e, "ddddd")}
                            >
                                <div className="ico">-</div>
                                <div className="op-name">{this.state.delBtnName}</div>
                            </div>


                        </div>
                    </div>

                </div>
            </div>
        )
    }
}















