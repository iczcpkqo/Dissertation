import React, {Component} from 'react';


export default class Search extends Component{

    constructor(props) {
        super(props);
        this.state = { searchText: "",
            onTextChange: this.props.onTextChange,
            onSearch: this.props.onSearch,
            onSearchType: this.props.onSearchType,
            defaultChecked: this.props.defaultChecked || "Movie",
            isFold: false
        }
    }

    onTextChange(txt){
        this.setState({searchText: txt});
        this.state.onTextChange(txt);
    }
    onSearchPress(e){
        if(e.key === "Enter")
            this.state.onSearch()
    }

    onSearchType(e){
        this.setState({defaultChecked: e.target.value});
        this.state.onSearchType(e.target.value);
    }

    onFold(){
        this.setState({isFold: true})
    }

    render() {
        return (

            <div className={"search " + (this.state.isFold ? "fold": "")}>
                <div className="search-con">
                    <div className="con-text">
                        <div className="con-input">
                            <div className="ctr-input">
                                <input type="text"
                                       placeholder="Text anything you want to search."
                                       value={this.state.searchText}
                                       onChange={(e)=>this.onTextChange(e.target.value)}
                                       onKeyPress={(e)=>this.onSearchPress(e)}/>
                            </div>

                        </div>
                        <div className="con-btn">
                            <div className="ctr-btn">
                                <input type="button" value="Search" onClick={()=>this.state.onSearch()}/>
                                <input type="button" className="btn-fold" value="Fold" onClick={()=>this.onFold()}/>

                            </div>

                        </div>

                    </div>
                    <div className="con-filter">
                        <div className="ctr-filter">
                            {/*<input type="checkbox" value="movie" checked={true}/>*/}
                            <input type="radio" name="search" value="Movie" onClick={(e)=>this.onSearchType(e)}
                                   checked={(this.state.defaultChecked === "Movie")}/>
                            <label>Movie</label>
                        </div>

                        <div className="ctr-filter">
                            {/*<input type="checkbox" value="person"/>*/}
                            <input type="radio" name="search" value="Person" onClick={(e)=>this.onSearchType(e)}
                                   checked={(this.state.defaultChecked === "Person")}/>
                            <label>Person</label>
                        </div>

                        <div className="ctr-filter">
                            {/*<input type="checkbox" value="company"/>*/}
                            <input type="radio" name="search" value="Company"  onClick={(e)=>this.onSearchType(e)}
                                   checked={(this.state.defaultChecked === "Company")}/>
                            <label>Company</label>
                        </div>

                        <div className="ctr-filter">
                            {/*<input type="checkbox" value="country"/>*/}
                            <input type="radio" name="search" value="Country"  onClick={(e)=>this.onSearchType(e)}
                                   checked={(this.state.defaultChecked === "Country")}/>
                            <label>Country</label>
                        </div>

                        <div className="ctr-filter">
                            {/*<input type="checkbox" value="genre"/>*/}
                            <input type="radio" name="search" value="Genre"  onClick={(e)=>this.onSearchType(e)}
                                   checked={(this.state.defaultChecked === "Genre")}/>
                            <label>Genre</label>
                        </div>

                        <div className="ctr-filter">
                            {/*<input type="checkbox" value="rating"/>*/}
                            <input type="radio" name="search" value="Rating"  onClick={(e)=>this.onSearchType(e)}
                                   checked={(this.state.defaultChecked === "Rating")}/>
                            <label>Rating</label>
                        </div>

                        <div className="ctr-filter">
                            {/*<input type="checkbox" value="time"/>*/}
                            <input type="radio" name="search" value="Time"  onClick={(e)=>this.onSearchType(e)}
                                   checked={(this.state.defaultChecked === "Time")}/>
                            <label>Time</label>
                        </div>

                    </div>

                </div>

                <span className="hr-1"></span>
            </div>
    )
    }
}















