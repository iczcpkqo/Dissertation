import React, {Component} from 'react';
import "./iokg.css"
import "./iokg.css"
import "../../component/iokg/base.css"
import "../../component/search/search.css"
import ajax from "../../api/ajax";
import Search from "../../component/search/search";
import Nodelist from "../../component/nodelist/nodelist";
import Supernode from "../../component/supernode/supernode";

export default class Iokg extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchText: "",
            maxShowChildren: 7,
            defaultSearch: "Movie",
            calendarEvent: "",
            calVisible: false,
            rootNodes: []
        }

    }

    async getSearchList(txt, queryID="homelist", subType="Movie"){
        console.log("-- get api test --- ");

        this.state.rootNodes = [];
        let node = []
        await ajax("executeQuery",{queryID: queryID, sch:txt, subType: subType}).then(e=>{
            console.log("-- ajax body --");
            console.log(e);
            for (let i in e.data){
                console.log("--== ajax body node: " + i);
                node.push(

                    <Nodelist
                        id={e.data[i]["subject"]}
                        type={e.data[i]["sub_type"].split("#")[1]}
                        txt={e.data[i]["sub_name"]}

                        listType="list"
                        isExtendOnece = "true"
                        extend="1"
                    />

            );
            }
        });

        node.length > this.state.maxShowChildren && ( node[this.state.maxShowChildren]=[
            <Supernode amount={node.length - this.state.maxShowChildren}>
                {node.splice(this.state.maxShowChildren, node.length - this.state.maxShowChildren)}
            </Supernode>
        ]);

        this.setState({rootNodes: []});
        this.setState({rootNodes: node});
        console.log("-- set node to root --");
        console.log(this.state.rootNodes);

    }

    saveSearchText(txt){
        this.setState({ searchText: txt })
    }

    onSearchBtnClick(){
        this.getSearchList(this.state.searchText, "homelist", this.state.defaultSearch);
    }
    onSearchType(val){
        // this.state.defaultSearch= val;
        this.setState({defaultSearch: val});
    }

    render() {
        return (
            <div className="v1">

                <div className="container">
                    <div className="container-kg">
                        <div className="container-search">
                            <div className="search-box">
                                <Search onTextChange={(txt)=>this.saveSearchText(txt)}
                                        onSearch={()=>this.onSearchBtnClick()}
                                        onSearchType={(val)=>this.onSearchType(val)}
                                        defaultChecked={this.state.defaultSearch}
                                />

                            </div>

                        </div>


                        <div className="container-maps">
                            <div className="node-box">
                                <div className="node-list-box">


                                    { this.state.rootNodes }

                                </div>
                            </div>

                        </div>

                    </div>

                </div>



            </div>
        )
    }
}














// <div className="n-movie">
//     <div className="nav node exploration">
//         <div className="n-predicate">
//             <div className="n-con">
//                 <div className="con-txt">
//                     Investsss
//                 </div>
//                 <div className="con-arr">
//                 </div>
//             </div>
//         </div>
//         <div className="n-type">
//             <div>
//                 Movie
//             </div>
//         </div>
//         <div className="n-obj">
//             <div>
//                 The Godfather
//             </div>
//         </div>
//         <div className="exploration-box">
//             <div className="n-predicate">
//                 <div className="n-con">
//                     <div className="con-txt">
//                         Invest
//                     </div>
//                     <div className="con-arr">
//                     </div>
//                 </div>
//                 <div className="n-con">
//                     <div className="con-txt">
//                         Invest
//                     </div>
//                     <div className="con-arr">
//                     </div>
//                 </div>
//                 <div className="n-con">
//                     <div className="con-txt">
//                         Invest
//                     </div>
//                     <div className="con-arr">
//                     </div>
//                 </div>
//                 <div className="n-con">
//                     <div className="con-txt">
//                         Invest
//                     </div>
//                     <div className="con-arr">
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>
// </div>

// <NodeMovie />
// <NodeMovie operation="true" pre="ddxxyy"/>
// <NodeMovie operation="true" explore="true" pre="ddxxyy"/>
// <NodeMovie operation="true" explore="true" pre="ddxxyy"/>
//
// <Node type={"movie"} predicate={"xxx"} txt={"aaa good film"} />
//
//
// <br/>
// <br/>
// <br/>
// <br/>
//
// xxxx
// xxxx
// xxxx
// xxxx
// <br/>
//
// <div className="n-movie">
//     <div className="nav node exploration">
//     <div className="n-predicate">
//     <div className="n-con">
//     <div className="con-txt">
//     Invest
//     </div>
// <div className="con-arr">
// </div>
// </div>
// </div>
// <div className="n-type">
//     <div>
//         Movie
//     </div>
// </div>
// <div className="n-obj">
//     <div>
//         The Godfather
//     </div>
// </div>
//
// <div className="exploration-box">
//     <div className="n-predicate">
//         <div className="n-con">
//             <div className="con-txt">
//                 Invest
//             </div>
//             <div className="con-arr">
//             </div>
//         </div>
//         <div className="n-con">
//             <div className="con-txt">
//                 Invest
//             </div>
//             <div className="con-arr">
//             </div>
//         </div>
//     </div>
// </div>
//
// <div className="operation-box">
//     ddds
// </div>
//
//
// </div>
// </div>
//
//
// <div className="n-movie">
//     <div className="nav node operation">
//         <div className="n-predicate">
//             <div className="n-con">
//                 <div className="con-txt">
//                     Invest
//                 </div>
//                 <div className="con-arr">
//                 </div>
//             </div>
//         </div>
//         <div className="n-type">
//             <div>
//                 Movie
//             </div>
//         </div>
//         <div className="n-obj">
//             <div>
//                 The Godfather
//             </div>
//         </div>
//
//         <div className="exploration-box">
//             <div className="n-predicate">
//                 <div className="n-con">
//                     <div className="con-txt">
//                         Investss
//                     </div>
//                     <div className="con-arr">
//                     </div>
//                 </div>
//                 <div className="n-con">
//                     <div className="con-txt">
//                         Invest
//                     </div>
//                     <div className="con-arr">
//                     </div>
//                 </div>
//             </div>
//         </div>
//
//         <div className="operation-box">
//             <div className="n-oper">
//                 <div className="oper">
//                     <div className="ico">-</div>
//                     <div className="op-name">Delete</div>
//                 </div>
//
//                 <div className="oper">
//                     <div className="ico">+</div>
//                     <div className="op-name">Explore More</div>
//                 </div>
//
//                 <div className="oper">
//                     <div className="ico">+</div>
//                     <div className="op-name">Dialog Window</div>
//                 </div>
//
//             </div>
//         </div>
//
//     </div>
// </div>
//
//
//
// yyyyy<br/>
// yyyyy<br/>
// yyyyy<br/>
// yyyyy<br/>
// yyyyy<br/>
// yyyyy<br/>
// yyyyy<br/>
// yyyyy<br/>
// yyyyy<br/>
// yyyyy<br/>
// yyyyy<br/>
//
//
//
// <div className="n-movie">
//     <div className="node">
//     <div className="n-type">
//     <div>
//     Movie
//     </div>
// </div>
// <div className="n-obj">
//     <div>
//         The Godfather
//     </div>
// </div>
// </div>
// </div>
//
// <div className="n-rating">
//     <div className="node">
//         <div className="n-predicate">
//             <div className="n-con">
//                 <div className="con-txt">
//                     Invest
//                 </div>
//                 <div className="con-arr">
//                 </div>
//             </div>
//         </div>
//         <div className="n-type">
//             <div>
//                 Rating
//             </div>
//         </div>
//         <div className="n-obj">
//             <div>
//                 R
//             </div>
//         </div>
//     </div>
// </div>
//
// <div className="n-genre">
//     <div className="node">
//         <div className="n-predicate">
//             <div className="n-con">
//                 <div className="con-txt">
//                     Invest
//                 </div>
//                 <div className="con-arr">
//                 </div>
//             </div>
//         </div>
//         <div className="n-type">
//             <div>
//                 Genre
//             </div>
//         </div>
//         <div className="n-obj">
//             <div>
//                 Action
//             </div>
//         </div>
//     </div>
// </div>
//
// <div className="n-time">
//     <div className="node">
//         <div className="n-predicate">
//             <div className="n-con">
//                 <div className="con-txt">
//                     Invest
//                 </div>
//                 <div className="con-arr">
//                 </div>
//             </div>
//         </div>
//         <div className="n-type">
//             <div>
//                 time
//             </div>
//         </div>
//         <div className="n-obj">
//             <div>
//                 80s
//             </div>
//         </div>
//     </div>
// </div>
//
// <div className="n-person">
//     <div className="node">
//         <div className="n-predicate">
//             <div className="n-con">
//                 <div className="con-txt">
//                     Invest
//                 </div>
//                 <div className="con-arr">
//                 </div>
//             </div>
//         </div>
//         <div className="n-type">
//             <div>
//                 Person
//             </div>
//         </div>
//         <div className="n-obj">
//             <div>
//                 Francis Ford
//             </div>
//         </div>
//     </div>
// </div>
//
// <div className="n-company">
//     <div className="node">
//         <div className="n-predicate">
//             <div className="n-con">
//                 <div className="con-txt">
//                     Invest
//                 </div>
//                 <div className="con-arr">
//                 </div>
//             </div>
//         </div>
//         <div className="n-type">
//             <div>
//                 Company
//             </div>
//         </div>
//         <div className="n-obj">
//             <div>
//                 Metro-Goldwyn-Mayer
//             </div>
//         </div>
//     </div>
// </div>
//
// <div className="n-country">
//     <div className="node">
//         <div className="n-predicate">
//             <div className="n-con">
//                 <div className="con-txt">
//                     Invest
//                 </div>
//                 <div className="con-arr">
//                 </div>
//             </div>
//         </div>
//         <div className="n-type">
//             <div>
//                 Country
//             </div>
//         </div>
//         <div className="n-obj">
//             <div>
//                 United States
//             </div>
//         </div>
//     </div>
// </div>
