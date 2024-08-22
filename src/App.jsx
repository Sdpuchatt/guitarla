import { useEffect, useState } from "react"
import Header from "./components/Header"
import Guitar from "./components/Guitar"
import {db} from './data/db'

function App() {
  //State

  const initialCart = () =>{
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : []
  }
  
  const [data] = useState(db)
  const [cart, setCart] = useState(initialCart)

  const MIN_ITEMS = 1
  const MAX_ITEMS = 5

  useEffect(()=>{
    localStorage.setItem('cart', JSON.stringify(cart))
  },[cart])

  function addToCart(item){ 
    const itemExist = cart.findIndex((guitar) => guitar.id === item.id)
    if ( itemExist >= 0){ // existe en el carrtito
      const updatedCart = [...cart]
      updatedCart[itemExist].quantity++
      console.log('Ya existe en el carrito')
      setCart(updatedCart)
    }
    else{
      console.log('No existe, Agregando...')
      item.quantity = 1
      setCart([...cart, item])
    }
    
  }

  function removeFromCart(id){
    console.log('eliminando...', id)
    setCart(prevCart => prevCart.filter(guitar => guitar.id !== id ))
  }

  function decreaseQuantity(id){
    const updateCart = cart.map(item => {
        if(item.id === id && item.quantity > 1){
        return{
          ...item,
          quantity: item.quantity - 1
        }
      }
      return item
    })
    setCart(updateCart)
  }

  function increaseQuantity(id){
    const updatedCart = cart.map(item => {
      if(item.id === id && item.quantity < MAX_ITEMS){
        return{
          ...item,
          quantity: item.quantity + 1 
        }
      }
      return item
    })
    setCart(updatedCart)
  }

  function cleanCart(){
    setCart([])
  }


  return (
    <>
      <Header 
        cart = {cart}
        removeFromCart = {removeFromCart}
        decreaseQuantity = {decreaseQuantity}
        increaseQuantity = {increaseQuantity}
        cleanCart = {cleanCart}
      />
      <main className="container-xl mt-5">
          <h2 className="text-center">Nuestra Colección</h2>
    
          <div className="row mt-5">
             {data.map((guitar)=>(
                <Guitar 
                  key={guitar.id}
                  guitar={guitar}
                  setCart={setCart}
                  addToCart={addToCart}
                />
              ))}
          </div>
      </main>
    
      <footer className="bg-dark mt-5 py-5">
          <div className="container-xl">
              <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
          </div>
      </footer>

    </>
  )
}

export default App
