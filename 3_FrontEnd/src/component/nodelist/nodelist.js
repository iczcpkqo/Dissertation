import React, {Component} from 'react';
import ajax from "../../api/ajax";
import "../../component/node/node.css"
import "../../component/nodelist/nodelist.css"
import "../../component/explorewindow/explorewindow.css"
import BaseNode from "../node/node";
import ExploreWindow from "../../component/explorewindow/explorewindow";
import Supernode from "../../component/supernode/supernode";

export default class Nodelist extends Component {

    constructor(props) {
        super(props);
        this.state = {}
        this.state = {
            nodeVisibility: true,
            exploreWindowVisibility: false,
            onPathClick: this.props.onPathClick || "",
            prebox: this.props.prebox,
            listType: this.props.listType || "window",
            operation: this.props.operation || false,
            explore: this.props.explore || false,
            extend: this.props.extend ? parseInt(this.props.extend) : 1,
            isExtendOnece: this.props.isExtendOnece || false,
            childrenBox: true,
            childrenBoxBtn: "Hidden",
            maxShowChildren: 7,
            id: this.props.id || "",
            predicate: this.props.predicate,
            type: this.props.type ? this.props.type.slice(0, 1).toUpperCase() + this.props.type.slice(1).toLowerCase() : "",
            txt: this.props.txt || "-",
            list: []
        }
        // if (this.state.listType === "window")
        //     this.state.onPathClick = this.props.onPathClick || this.onPathClickRoot;

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

        this.state.isExtendOnece && (() => {
            setTimeout(() => this.recursionNodeList(this.state.extend, this.state.listType, this.state.operation, this.state.path), 0);
        })();
    }

    explorationNode() {
        console.log("explore node");
    }

    toggleExploreWindow(e) {
        this.setState({exploreWindowVisibility: !this.state.exploreWindowVisibility});
    }

    closeExploreWindow() {
    }

    recursionNodeList(extend, listType, operation, path) {
        if (1 === extend) return;
        this.loadNodelist(extend - 1, listType, operation, path, this.state.id);
    }

    async loadNodelist(extend, listType, operation, path, id) {
        console.log("-- get node list --- ");

        let nodes = []
        await ajax("executeQuery",{queryID: "allchildren", subject: this.state.id}).then(e=>{
            console.log("-- node list ajax body --");
            for (let i in e.data){
                console.log("--== node list ajax body node: " + i);
                nodes.push( <Nodelist
                                        extend={extend}
                                        listType={listType}
                                        operation={operation}
                                        path={path}
                                        // onPathClick={this.state.listType === "window" ? (o) => this.onPathClick(o) : ""}
                                        onPathClick={(o)=>this.state.onPathClick(o) || ""}

                                        id={e.data[i]["object"]}
                                        predicate={e.data[i]["predicate"].split("#")[1]}
                                        type={e.data[i]["obj_type"].split("#")[1]}
                                        txt={e.data[i]["obj_name"]}/>);}});

        nodes.length > this.state.maxShowChildren && ( nodes[this.state.maxShowChildren]=[
            <Supernode amount={nodes.length - this.state.maxShowChildren}>
                {nodes.splice(this.state.maxShowChildren, nodes.length - this.state.maxShowChildren)}
            </Supernode>
        ]);

        this.setState({ list: nodes});

        // this.setState({rootNodes: node});
        // console.log("-- set node to root --");
        // console.log(this.state.rootNodes);

        // this.setState({
        //     list: (
        //         <>
        //             {/*<BaseNode/>*/}
        //             {/*<BaseNode/>*/}
        //
        //             {/*onPathClick={onPathClick ? (o)=>onPathClick(o) : ""}*/}
        //
        //             <Nodelist
        //                 extend={extend}
        //                 listType={listType}
        //                 operation={operation}
        //                 path={path}
        //                 // onPathClick={this.state.listType === "window" ? (o) => this.onPathClick(o) : ""}
        //                 onPathClick={(o)=>this.state.onPathClick(o) || ""}
        //
        //                 id={id}
        //                 predicate="directBy"
        //                 type="person"
        //                 txt={id}/>
        //
        //             <Nodelist
        //                 extend={extend}
        //                 listType={listType}
        //                 operation={operation}
        //                 path={path}
        //                 // onPathClick={this.state.listType === "window" ? (o) => this.onPathClick(o) : ""}
        //                 onPathClick={(o)=>this.state.onPathClick(o) || ""}
        //
        //                 id={id}
        //                 predicate="country"
        //                 type="country"
        //                 txt={id}/>
        //
        //             <Nodelist
        //                 extend={extend}
        //                 listType={listType}
        //                 operation={operation}
        //                 path={path}
        //                 // onPathClick={this.state.listType === "window" ? (o) => this.onPathClick(o) : ""}
        //                 onPathClick={(o)=>this.state.onPathClick(o) || ""}
        //
        //                 id={id}
        //                 predicate="company"
        //                 type="company"
        //                 txt={id}/>
        //         </>
        //     )
        // });
    }

    // loadListNodes(){
    // }
    // loadWindowNodes(){
    // }

    onGetChildMargin() {

    }

    onPathUpNav(path){

    }

    onPathClickRoot(path) {
        console.log("#####################Root");
        console.log(path);
        this.onPathUpNav(path);
    }

    onPathClick(path) {
        console.log("##################### path");
        console.log(path);
        this.state.onPathClick(path);
        // path ?
        //     this.state.onPathClick(path.push({
        //         id: this.state.id,
        //         type: this.state.type,
        //         txt: this.state.txt
        //     }))
        //     : [{
        //         id: this.state.id,
        //         type: this.state.type,
        //         txt: this.state.txt
        //     }]
        // ;
    }

    onListNodeClick(e) {
        this.toggleExploreWindow(e);
    }

    onWindowNodeClick(e) {
        this.state.onPathClick(this.state.path);
        this.setState({childrenBox: true});
        this.loadNodelist(0, "window", true, this.state.path, this.state.id);
    }

    onNodeDeleteClick(e, str) {

        this.setState({childrenBoxBtn: (this.state.childrenBox ? "Hidden":"Show")});
        this.setState({childrenBox: !this.state.childrenBox});

        e.stopPropagation();
    }

    onNodeExploreClick(e, str) {
        e.stopPropagation();
    }

    onNodeDialogueClick(e, str) {
        e.stopPropagation();
    }


    onNodeClick(e) {
        switch (this.state.listType) {
            case "list":
                this.onListNodeClick(e);
                break;
            case "window":
                this.onWindowNodeClick(e);
                break;
            default:
                console.log("default");
                break;
        }
    }

    componentDidMount() {
        window.addEventListener("mouseup", this.closeExploreWindow, false)
    }
    componentWillUnmount() {
        window.removeEventListener("mouseup", this.closeExploreWindow, false)
    }

    render() {
        return (
            <>
                <div className="nodelist" style={(() => {
                    return this.state.nodeVisibility ? {display: "block"} : {display: "none"};
                })()}>
                    <div className="con-list">
                        <div className="parent-node-box">
                            <div className="con-parent">
                                <BaseNode predicate={this.state.predicate}
                                          type={this.state.type}
                                          operation={this.state.operation}
                                          txt={this.state.txt}
                                          path={this.state.path}
                                          delBtnName={this.state.childrenBoxBtn}

                                          onNodeClick={(e) => this.onNodeClick(e)}
                                          onNodeDeleteClick={(e, o) => this.onNodeDeleteClick(e, o)}
                                          onNodeExploreClick={(e, o) => this.onNodeExploreClick(e, o)}
                                          onNodeDialogueClick={(e, o) => this.onNodeDialogueClick(e, o)}
                                />

                                {(() => {
                                    if (this.state.exploreWindowVisibility)
                                        return (
                                            <div className="explore-window">

                                                <ExploreWindow
                                                    id={this.state.id}
                                                    type={this.state.type}
                                                    txt={this.state.txt}
                                                />

                                            </div>
                                        );
                                })()}
                            </div>
                        </div>

                        {/*<div className="child-node-box ">*/}
                        <div className={"child-node-box " + (this.state.childrenBox ? "show":"hidden")}>
                            <div className="con-child">
                                {/*<BaseNode predicate="country" type="country" txt="China"/>*/}
                                {this.state.list}
                            </div>
                        </div>

                    </div>
                </div>
            </>
        )
    }
}















