// Write your code here
import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      let Result = 0
      let Quantity = 0
      const OrderTotal = cartList.map(eachitem => {
        Result += eachitem.price * eachitem.quantity
        Quantity += eachitem.quantity
        return Result
      })

      return (
        <div className="carSummary-container">
          <h1 className="orderTotal">
            Order Total :<span className="amount">Rs {Result}/-</span>
          </h1>
          <p className="quantity">{Quantity} items in cart</p>
          <button type="button" className="orderedBtn">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
