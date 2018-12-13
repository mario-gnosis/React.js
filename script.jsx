var Product = React.createClass({
  getInitialState: function(){
     return {qty: 0};
  },
  buy: function(){
   this.setState({qty: this.state.qty + 1});
   this.props.handleTotal(this.props.price);
  },
  delet: function(){
    this.setState({qty: this.state.qty - 1});
  },
  show: function(){
    this.props.handleShow(this.props.name);
  },
  render: function(){
    return(
      <div>
          <p>{this.props.name} - {this.props.price}</p>
          <button className="buy"onClick={this.buy}>Buy</button>
          <button className="delet"onClick={this.delet}>Delet</button>
          <button  className="show" onClick={this.show}>Show</button>
          <h3>Qty: {this.state.qty} item($)</h3>
          <hr/>
      </div>      
      );
  }
});

React.render(<Product/>, document.getElementById("root"));

var Total = React.createClass({
  render: function(){
    return(
      <div>
        <h3>Total cash: $ {this.props.total} </h3>
      </div>
    );
  }
});
var ProductForm = React.createClass({
  
   submit: function(e){
     e.preventDefault();
    
    var product = {
      name: this.refs.name.value,
      price: parseInt(this.refs.price.value)
    }
    
    this.props.handleCreate(product);
    
     this.refs.name.value = "";
     this.refs.price.value = "";
   },
   
   render: function(){
     return(
       <form onSubmit={this.submit}>
       <h3>Idea usada: PLUNKER</h3>
          <input type="text" placeholder="Product Name" ref="name"/> -  
          <input className="prodPrice" type="text" placeholder="Product Price" ref="price"/> 
          <br/><br/>
          <button className="corButton">Create Product</button>
          <hr/>
       </form>
       );
   }
});

var ProductList = React.createClass({
  getInitialState:  function(){
    return {
      total: 0,
      productList: [
        {name: "Android", price: 199},
        {name: "Apple", price: 210},
        {name: "Nokia", price: 99},
        ]
    };
  },
  
  createProduct: function(product){
    this.setState({
      productList: this.state.productList.concat(product)
    })
  },
  
  calcularTotal: function(price){
    this.setState({total: this.state.total + price});
  },
  showProduct: function(name){
    alert("Selected is " + name );
  },
  
  render: function(){
    var component = this;
    var products = this.state.productList.map(function(product){
      return(
        <Product name={product.name} price={product.price} 
        handleShow={component.showProduct} handleTotal={component.calcularTotal}/>
        );
    });
    
    return(
      <div>
         <ProductForm handleCreate={this.createProduct}/>
         {products}
         <Total total={this.state.total} />
      </div>
      );
  }
  
});
React.render(<ProductList/>, document.getElementById("root"));








