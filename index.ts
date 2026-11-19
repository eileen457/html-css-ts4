interface Item{
  type:"book"|"electronics"|"clothing";
  id:string;
  price:number;
  }


  interface Book extends Item{
    type:"book";
    title:string;
    author:string;
  }

  interface Electronics extends Item{
    type:"electronics";
    item:string;
    model:string;
    warranty?:number;
  }

  interface Clothing extends Item{
    type:"clothing";
    item:string;
    brand:string;
    size?:"S"|"M"|"L";
  }

type Product = Book|Electronics|Clothing;

class Collection<T>{
  items:T[];
  constructor(items:T[]){
    this.items=items;
  }
  getAll(){
    return this.items;
  };

  filter(callback:(items:T)=>boolean):T[]{
    return this.items.filter(callback);
  }
}

function renderProduct(product: Product): string {
  let texto = "";

  if (product.type === "book") {
    texto = `Book: ${product.title} by ${product.author}`;
  }

  if (product.type === "electronics") {

    texto = `Electronics: ${product.item} - ${product.model}`;
    

    if (product.warranty !== undefined) {
     texto += ` - Warranty: ${product.warranty} year(s)`;
    }
  }

  if (product.type === "clothing") {
    texto = `Clothing: ${product.item} by ${product.brand}`;
    if (product.size !== undefined) {
      texto += ` - Size ${product.size}`;
    }
  }


  if (product.type !== "book" && product.type !== "electronics" && product.type !== "clothing") {
    throw new Error(`Unknown product type: ${JSON.stringify(product)}`);
  }

  return `
    <div class="item" id="${product.id}">
      <div class="price">${product.price}</div>
      <div>${texto}</div>
    </div>
  `;
}

const products = new Collection<Product>([
  { id: "b1", type: "book", price: 12, title: "A", author: "B"},
  {id: "e1", type: 'electronics', price: 230, item: 'C', model: 'D', warranty: 1 },
  {id:"c1", type: 'clothing', price:80, item: 'E', brand: 'F', size: 'M' } 
]);

function showProducts(typeFilter?:string){
  const output=document.getElementById("output")!;
  const lst=typeFilter?products.filter(p=>p.type===typeFilter):products.getAll();

  output.innerHTML=lst.map(p=>renderProduct(p)).join("");
}

document.getElementById('all')!.onclick = () => showProducts();
document.getElementById('books')!.onclick = () => showProducts('book');
document.getElementById('electronics')!.onclick = () => showProducts('electronics');
document.getElementById('clothing')!.onclick = () => showProducts('clothing');


document.addEventListener("DOMContentLoaded",(e)=>{showProducts()});
