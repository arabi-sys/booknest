import React, { useState } from "react";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();

  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutInfo, setCheckoutInfo] = useState({
    name: "",
    address: "",
    email: ""
  });
  const [checkoutError, setCheckoutError] = useState("");
  const [orderComplete, setOrderComplete] = useState(false);

  const totalCost = cartItems.reduce(
    (sum, item) => sum + (item.price * item.quantity), 0
  );

  function handleInput(e) {
    setCheckoutInfo({ ...checkoutInfo, [e.target.name]: e.target.value });
  }

  function handleCheckoutSubmit(e) {
    e.preventDefault();
    const { name, address, email } = checkoutInfo;
    if (!name || !address || !email || !email.includes("@")) {
      setCheckoutError("Please fill all fields with a valid email!");
      return;
    }
    // Simulate order complete
    setOrderComplete(true);
    clearCart();
  }

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center">Your Cart</h2>
      {orderComplete ? (
        <div className="alert alert-success text-center my-5">
          <h4>Thank you for your order!</h4>
          <p>
            Your order has been submitted successfully.<br />
            We’ll send you a confirmation email soon.
          </p>
        </div>
      ) : cartItems.length === 0 ? (
        <div className="text-muted text-center">Your cart is empty.</div>
      ) : (
        <>
          <div className="table-responsive">
            <table className="table align-middle">
              <thead>
                <tr>
                  <th>Cover</th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Subtotal</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map(item => (
                  <tr key={item.id}>
                    <td>
                      <img
                        src={item.cover}
                        alt={item.title}
                        style={{ width: 40, height: 60, objectFit: "cover", borderRadius: 4 }}
                      />
                    </td>
                    <td>{item.title}</td>
                    <td>{item.author}</td>
                    <td>${item.price.toFixed(2)}</td>
                    <td>
                      <input
                        type="number"
                        min={1}
                        max={item.stock}
                        value={item.quantity}
                        onChange={e =>
                          updateQuantity(item.id, Math.max(1, Math.min(item.stock, Number(e.target.value))))
                        }
                        style={{ width: 55 }}
                      />
                    </td>
                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="my-3 text-end">
              <strong>Total: ${totalCost.toFixed(2)}</strong>
            </div>
            <div className="text-end">
              <button
                className="btn btn-warning me-2"
                onClick={clearCart}
              >
                Clear Cart
              </button>
              <button
                className="btn btn-primary"
                onClick={() => setShowCheckout(true)}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
          {/* Checkout Modal */}
          {showCheckout && (
            <div
              className="modal show"
              style={{ display: "block", background: "rgba(0,0,0,0.2)" }}
              tabIndex={-1}
              onClick={() => setShowCheckout(false)}
            >
              <div className="modal-dialog" onClick={e => e.stopPropagation()}>
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Checkout</h5>
                    <button
                      className="btn-close"
                      type="button"
                      onClick={() => setShowCheckout(false)}
                    />
                  </div>
                  <form onSubmit={handleCheckoutSubmit}>
                    <div className="modal-body">
                      <div className="mb-2">
                        <label className="form-label">Name</label>
                        <input
                          type="text"
                          name="name"
                          className="form-control"
                          value={checkoutInfo.name}
                          onChange={handleInput}
                        />
                      </div>
                      <div className="mb-2">
                        <label className="form-label">Address</label>
                        <input
                          type="text"
                          name="address"
                          className="form-control"
                          value={checkoutInfo.address}
                          onChange={handleInput}
                        />
                      </div>
                      <div className="mb-2">
                        <label className="form-label">Email</label>
                        <input
                          type="email"
                          name="email"
                          className="form-control"
                          value={checkoutInfo.email}
                          onChange={handleInput}
                        />
                      </div>
                      {checkoutError && (
                        <div className="alert alert-danger py-2">{checkoutError}</div>
                      )}
                      <div className="mt-3">
                        <strong>Order Total: ${totalCost.toFixed(2)}</strong>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button className="btn btn-primary" type="submit">
                        Submit Order
                      </button>
                      <button
                        className="btn btn-secondary"
                        type="button"
                        onClick={() => setShowCheckout(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}