import React, { Component } from 'react'

class Pagination extends Component {
  constructor(props) {
    super(props)
    this.state = {
      prev_pages: [],
      next_pages: [],
      lastNumber: '',
      showEllipis: true,
      totalPages:0
    }
  }
  componentDidMount(){
    
  }

  static getDerivedStateFromProps(props, state) {
        let pArray = [];
        let nArray=[]
    if(props.totalPages!==state.totalPage){
      if(props.totalPages <= 8){
        
        for(let i = props.currentPage ;i>0;i--){
          pArray.push(i)
        }
        for(let j = props.currentPage+1; j<props.totalPage;j++ ){
          nArray.push(j)
        }
        pArray.reverse()
        return {totalPages:props.totalPages,prev_pages:pArray,next_pages:nArray}
      }else{
        if(props.currentPage<=4){
          // for(let i = props.currentPage;i>0;i-- ){
          //   pArray.push(i)
          // }
          pArray=[1,2,3,4]
          // let index = 1
          // for(let j = props.currentPage +1; index< 4;j++){
          //   nArray.push(j)
          //   index++
          // }
          // pArray.reverse()
          nArray=[5,6,7,8]
          return {totalPages:props.totalPages,prev_pages:pArray,next_pages:nArray}
          // this.setState({prev_pages:[1,2,3,4,5]})
        }else{
          
          if(props.currentPage+3>=props.totalPages){
            let index = 1
            for(let i = props.currentPage;i>=0 ;i--){
              pArray.push(i)
              if(index ===4){
                break
              }
              index++
            }
            pArray.reverse()

            for(let j = props.totalPages;j>props.currentPage;j--){
              nArray.push(j)
            }
            nArray.reverse()
            return {totalPages:props.totalPages,prev_pages:pArray,next_pages:nArray}
          }else{
            let index = 1
            for(let j = props.currentPage+1;index<4;j++){
              nArray.push(j)
              index++
            }
            index = 1
            for(let i = props.currentPage;i>=0 ;i--){
              pArray.push(i)
              if(index ===4){
                break
              }
              index++
            }
            pArray.reverse()            
            
            

            return {totalPages:props.totalPages,prev_pages:pArray,next_pages:nArray}
          }
          // this.setState({prev_pages:fArray})
          
        }
        // this.setState({lastNumber:this.props.totalPages})
      }
      
      // return {totalPages:props.totalPages}
      
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
      );
    }
  };

  render() {
    console.log(this.state.prev_pages)
    console.log(this.state.next_pages)

    // console.log('props:',this.props)
    // console.log('state:',this.state)

    return (
      <nav>
        <ul className="pagination">
          <li className="page-item">
            <a className="page-link prev_page" href="#" onClick={this.prev}>
              <span>&laquo;</span>
            </a>
          </li>

          {/* {this.props.totalPages <= 7 ? (
            this.state.prev_pages.map((no, index) => {
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
              {this.state.prev_pages.map((no, index) => {
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
          )} */}

          {
            this.state.prev_pages.map((no, index) => {
              return (
                <li className={this.isactive(no) ? "is-active page-item " : "page-item "}>
                  <a key={index} 
                    onClick={() => {this.changeCurrentPage(no);}} className="page-link" href="#">{no}
                  </a>
                </li>
              );
            })
          }
          {
            this.state.next_pages.map((no, index) => {
              return (
                <li className={this.isactive(no) ? "is-active page-item " : "page-item "}>
                  <a key={index} 
                    onClick={() => {this.changeCurrentPage(no);}} className="page-link" href="#">{no}
                  </a>
                </li>
              );
            })
          }


          <li className="page-item">
            <a className="page-link next_page" href="#" onClick={this.next} >
              <span>&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    )
  }
}
export default Pagination
