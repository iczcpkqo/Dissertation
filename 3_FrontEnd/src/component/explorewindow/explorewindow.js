import React, {Component} from 'react';
import "../../component/node/node.css"
import "../../component/nodelist/nodelist.css"
import BaseNode from "../node/node";
import Nodelist from "../nodelist/nodelist";


export default class Explorewindow extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id || "",
            type: this.props.type || "",
            txt: this.props.txt || "-",
            path: [{
                id: this.props.id || "",
                type: this.props.type ? this.props.type.slice(0, 1).toUpperCase() + this.props.type.slice(1).toLowerCase() : "",
                txt: this.props.txt
            }]
        };

        this.state.refreshHelper = true;

    }

    reToggle(){
        this.setState({refreshHelper: !this.state.refreshHelper});
    }

    refreshHelper(){
        this.reToggle();
        setTimeout(() => {
            this.reToggle();
        }, 0);
    }

    onSetNavPath(path){
        console.log("# # #  Nav Path");
        console.log(path);

        this.setState({ path: path });

        this.refreshHelper();

    }

    render(){
        return (
            <>
                <div className="explore-arr">
                    <div className="border-left-empty">
                        <span></span>
                    </div>
                </div>
                <div className="con-explore-window">

                    <div className="node-navigation">
                        <div className="con-node-navigation">

                            {(()=>{
                                if(this.state.refreshHelper)
                                    return (
                                        <>
                                            {this.state.path.map((val) => {
                                                return (
                                                    <div className="cell-nav">
                                                        <BaseNode
                                                            id=""
                                                            predicate={val.predicate}
                                                            type={val.type}
                                                            txt={val.txt}
                                                            onNodeClick={() => {
                                                                console.log("nav node clicked");
                                                            }}
                                                        />
                                                    </div>
                                                )
                                            })}
                                        </>
                                    )
                            })()}


                        </div>
                    </div>

                    <div className="explore-list">
                        <div className="con-explore-list">

                                <Nodelist
                                    listType="window"
                                    operation="true"
                                    extend="0"
                                    onPathClick={(o)=>this.onSetNavPath(o)}

                                    id={this.state.id}
                                    type={this.state.type}
                                    txt={this.state.txt}/>

                        </div>
                    </div>
                </div>
            </>
        )
    }
}















