import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Loader from './Loader.js'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'

export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 9,
        category: 'general'
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }
    constructor(props) {
        super(props)
        this.state = {
            articles: [],
            loading: false,
            page: 1,
        }
        document.title=`${props.category.charAt(0).toUpperCase()+props.category.slice(1)}-Newz`
    }
    updateNews =async ()=>{
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true })
        let response = await fetch(url);
        let data = await response.json();
        this.setState({ articles: data.articles, totalResults: data.totalResults, loading: false }) 
    }
    async componentDidMount() {
        this.updateNews()
        this.setState({page:this.state.page+1})
    }
    fetchMoreData = async() => {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        this.setState({page:this.state.page+1})
        this.setState({ loading: true })
        let response = await fetch(url);
        let data = await response.json();
        this.setState({ articles: this.state.articles.concat(data.articles), loading: false })
      };
    render() {
        return (
            <>
                <h1 className="text-center my-4">Newz-Top {this.props.category.charAt(0).toUpperCase()+this.props.category.slice(1)} Headlines</h1>
                {this.state.loading && <Loader/>}
                <InfiniteScroll
                dataLength={this.state.articles.length}
                next={this.fetchMoreData}
                hasMore={this.state.page<this.state.totalResults/this.props.pageSize}
                loader={<Loader/>}
                >
                <div className="container my-3">
                <div className="row">
                    {this.state.articles.map((element) => {
                        return <div className="col-md-4 my-2" key={element.url}>
                            <Newsitem title={element.title} description={element.description} imageUrl={element.urlToImage ? element.urlToImage : 'https://images.moneycontrol.com/static-mcnews/2024/06/20240613084335_Happy-Fathers-Day-2024.jpg?impolicy=website&width=770&height=431'} newsUrl={element.url} author={element.author ? element.author : "Unknown"} date={element.publishedAt} source={element.source.name} />
                        </div>
                    })} 
                </div>
                </div>
                </InfiniteScroll>
            </>
        )
    }
}

export default News
