import React, { Component } from "react";
class Newsitem extends Component {
    render() {
        let { title, description, imageUrl, newsUrl, author, date, source } = this.props;
        return (
            <div>
                <div className="card" style={{ width: "20rem" }}>
                    <img src={imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <span class="position-absolute top-0 start-0 translate-middle badge rounded-pill bg-danger" style={{zIndex:"1"}}>
                            {source}
                            <span class="visually-hidden">unread messages</span>
                        </span>
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text"><small className="text-muted">By {author ? author : "Unknown"} {new Date(date).toGMTString()}</small></p>
                        <a href={newsUrl} target="_blank" className="btn btn-sm  btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        );
    }
}
export default Newsitem;