import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from "prop-types"
class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 9,
        category: 'general'
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,

    }
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    constructor(props) {
        super(props);
        // console.log("hello i am news component constructor");
        this.state = {
            articles: [],
            loading: false,
            page: 1,
        };
        document.title = `${this.capitalizeFirstLetter(this.props.category)}- NewsMonkey`
    }
    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0131227ec3284c7f8375ec0b6790d704&page=1&pagesize=${this.props.pageSize}`
        this.setState({ loading: true })
        let data = await fetch(url);
        let parsedData = await data.json();
        // console.log(parsedData);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        })
    }
    handleNextClick = async () => {
        // console.log("next");
        if (this.state.page + 1 <= Math.ceil(this.state.totalResults / this.props.pageSize)) {
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0131227ec3284c7f8375ec0b6790d704&page=${this.state.page + 1}&pagesize=${this.props.pageSize}`
            this.setState({ loading: true })
            let data = await fetch(url);
            let parsedData = await data.json();
            this.setState({
                page: this.state.page + 1,
                articles: parsedData.articles,
                loading: false
            })
        }
    }
    handlePrevClick = async () => {
        // console.log("prev");
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0131227ec3284c7f8375ec0b6790d704&page=${this.state.page - 1}&pagesize=${this.props.pageSize}`
        this.setState({ loading: true })
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles,
            loading: false
        })
    }
    render() {
        return (
            <div className="container md-3">
                <h1 className="text-center" style={{ margin: "30px" }}>NewsFreak - Top {this.capitalizeFirstLetter(this.props.category)} headlines</h1>
                {this.state.loading && <Spinner />}
                <div className="row">
                    {!this.state.loading && this.state.articles.map((ele) => {
                        return (<div className="col md-4 my-1" key={ele.url}>
                            <Newsitem title={ele.title ? ele.title.slice(0, 40) : ""} description={ele.description ? ele.description.slice(0, 80) : ""} imageUrl={ele.urlToImage ? ele.urlToImage : ""} newsUrl={ele.url ? ele.url : ""} author={ele.author} date={ele.publishedAt} source={ele.source.name} />
                        </div>
                        );
                    })}
                </div>
                <div className="container d-flex justify-content-between my-1">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Prev</button>
                    <button disabled={this.state.page >= Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </div>
        );
    }
}
export default News;