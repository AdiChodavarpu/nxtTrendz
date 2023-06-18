import CartItem from '../CartItem'
import CartContext from '../../context/CartContext'
import CartSummary from '../CartSummary'

import './index.css'

const CartListView = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value

      const RemoveAllItem = () => {
        removeAllCartItems()
      }

      return (
        <>
          <button type="button" className="removeAll" onClick={RemoveAllItem}>
            Remove All
          </button>
          <ul className="cart-list">
            {cartList.map(eachCartItem => (
              <CartItem key={eachCartItem.id} cartItemDetails={eachCartItem} />
            ))}
          </ul>
          <CartSummary />
        </>
      )
    }}
  </CartContext.Consumer>
)

export default CartListView
