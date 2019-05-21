import React, { Component } from 'react'

class Pagination extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstFiveArray: [1],
      lastNumber: '',
      showEllipis: true,
    }
  }
  componentDidMount(){
    if(this.props.totalPages <= 7){
      let fArray = [];
      for(let i = 1;i<= this.props.totalPages;i++){
        fArray.push(i)
      }
      // console.log(this.props.totalPages)

      this.setState({firstFiveArray:fArray})
    }else{
      if(this.props.currentPage< 5){
        console.log('< 5')
        this.setState({firstFiveArray:[1,2,3,4,5]})
      }else{
        let fArray = []
        let index = 1
        for(let j = this.props.currentPage; j>=0;j--){
          fArray.push(j)
          if(index ===5){
            break
          }
          index++
        }
        fArray.reverse()
        this.setState({firstFiveArray:fArray})
      }
      this.setState({lastNumber:this.props.totalPages})
    }
  }

  prev = () => {
    if (this.props.currentPage > 1) {
      this.props.changeCurrentPage(this.props.currentPage - 1);
    }
  };
  next = () => {
    if (this.props.currentPage < this.props.totalPages) {
      this.props.changeCurrentPage(this.props.currentPage + 1);
    }
  };
  changeCurrentPage = no => {
    this.props.changeCurrentPage(no);
  };

  showEllipsis = () => {
    if (this.state.showEllipis) {
      return (
       
          <li className="page-item"><a className="page-link">...</a></li>
       
      );
    }
  };

  isactive = currentPage => {
    if (this.props.currentPage == currentPage) {
      return true;
    }
    return false;
  };

  showLastPagi = () => {
    if (this.props.currentPage !== this.props.totalPages) {
      return (

        <li className={this.isactive(this.props.totalPages) ? "is-active page-item " : "page-item "}>
          <a
            onClick={() => {this.changeCurrentPage(this.props.totalPages)}} className="page-link" href="#">{this.props.totalPages}
          </a>
        </li>
        // <a
        //   className={this.isactive(this.props.totalPages) ? "is-active" : ""}
        //   onClick={() => {
        //     this.changeCurrentPage(this.props.totalPages);
        //   }}
        // >
        //   <li>{this.props.totalPages}</li>
        // </a>
      );
    }
  };

  render() {
    return (
      <nav>
        <ul className="pagination">
          <li className="page-item">
            <a className="page-link" href="#" onClick={this.prev}>
              <span>&laquo;</span>
            </a>
          </li>

          {this.props.totalPages <= 7 ? (
            this.state.firstFiveArray.map((no, index) => {
              return (
                <li className={this.isactive(no) ? "is-active page-item " : "page-item "}>
                  <a key={index} 
                    onClick={() => {this.changeCurrentPage(no);}} className="page-link" href="#">{no}
                  </a>
                </li>
              );
            })
          ) : (
            <>
              {this.state.firstFiveArray.map((no, index) => {
                return (
                  <li className={this.isactive(no) ? "is-active page-item " : "page-item "}>
                  <a key={index} 
                    onClick={() => {this.changeCurrentPage(no);}} className="page-link" href="#">{no}
                  </a>
                </li>
                );
              })}
              {this.showEllipsis()}

              {this.showLastPagi()}
            </>
          )}

          <li className="page-item">
            <a className="page-link" href="#" onClick={this.next} >
              <span>&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    )
  }
}
export default Pagination
