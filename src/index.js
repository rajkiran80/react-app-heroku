import React from 'react';
import React,{useState} from 'react';
import ReactDOM, { render } from 'react-dom';
import products from './products';
import './index.css';


const map = new Map();
const filterPriceList=[{start:100,end:200},{start:201,end:350},{start:351,end:450},{start:451,end:500}]

function Board(){
    const [showFilteredItem,setShowFilteredItem]=useState([])
    const showItems=showFilteredItem.length === 0 ? products : showFilteredItem
    
    const filterPriceFxn=(start,end,check)=>{
         const filteredArray=[...showFilteredItem]
         products.filter((product) => {
             if(!map.has(product.id) && (start <= product.price) && (product.price < end) && check.checked === true){
                 filteredArray.push(product)
                 map.set(product.id,1)
                 setShowFilteredItem(filteredArray)
             }
         })
         if(check.checked === false){
            let indexes=[]
            products.map((prod,index) => {
                if((start <= prod.price) && (prod.price <= end)){
                    indexes.push(index)
                    map.delete(prod.id)
                }
            })
            let i=indexes.length-1
            indexes.forEach(()=>{
                filteredArray.splice(i,1)
                setShowFilteredItem(filteredArray)
                i--
            })
            indexes=[]
         }
    }

    return (
       <div className="container">
           <div className="items">
                {
                  showItems.map((product) => {
                      return (
                                <div className="card" key={product.id}>
                                   <div className="name">{product.name}</div>
                                   <div className="price">{product.price}</div>
                                </div>
                             )
                  })
                }
           </div>
           <div className="filters card">
                <h5>Price </h5>
                {
                    filterPriceList.map((filterPirce,index) => {
                         return <label key={index}>
                                     <input type="checkbox" onClick={(e)=>filterPriceFxn(filterPirce.start,filterPirce.end,e.target)}/> 
                                     Rs.{filterPirce.start} to Rs.{filterPirce.end}
                                </label>
                   })
                }
           </div>
       </div>
    )
}

ReactDOM.render(
  <Board />,
  document.getElementById('root')
);
