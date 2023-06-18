import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }
  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  addCartItem = product => {
    const {cartList} = this.state

    const CheckCart = cartList.filter(eachitem => eachitem.id === product.id)

    if (CheckCart.length > 0) {
      this.setState(prevValue => ({
        cartList: prevValue.cartList.map(eachitem =>
          eachitem.id === product.id
            ? {...eachitem, quantity: eachitem.quantity + product.quantity}
            : eachitem,
        ),
      }))
    } else {
      this.setState(prevState => ({
        cartList: [...prevState.cartList, product],
      }))
    }
    //   TODO: Update the code here to implement addCartItem
  }

  removeCartItem = removeId => {
    const {cartList} = this.state
    const filterRemove = cartList.filter(eachitem => eachitem.id !== removeId)
    this.setState({cartList: filterRemove})
  }

  incrementCartItemQuantity = product => {
    this.setState(prevValue => ({
      cartList: prevValue.cartList.map(eachitem =>
        eachitem.id === product.id
          ? {...eachitem, quantity: eachitem.quantity + 1}
          : eachitem,
      ),
    }))
  }

  decrementCartItemQuantity = product => {
    const {cartList} = this.state
    if (product.quantity > 1) {
      this.setState(prevValue => ({
        cartList: prevValue.cartList.map(eachitem =>
          eachitem.id === product.id
            ? {...eachitem, quantity: eachitem.quantity - 1}
            : eachitem,
        ),
      }))
    } else {
      const filterRemove = cartList.filter(
        eachitem => eachitem.id !== product.id,
      )
      this.setState({cartList: filterRemove})
    }
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
