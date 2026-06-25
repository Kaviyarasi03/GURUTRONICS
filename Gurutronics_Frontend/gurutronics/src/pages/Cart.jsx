import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import cartHero from "../assets/cart_bg.png";

const Icon = ({ name, size = 22, className = "" }) => {
  const p = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className,
  };

  const icons = {
    arrow: (
      <svg {...p}>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </svg>
    ),
    back: (
      <svg {...p}>
        <path d="M19 12H5" />
        <path d="m11 6-6 6 6 6" />
      </svg>
    ),
    trash: (
      <svg {...p}>
        <path d="M3 6h18" />
        <path d="M8 6V4h8v2" />
        <path d="M6 6l1 15h10l1-15" />
        <path d="M10 11v6M14 11v6" />
      </svg>
    ),
    x: (
      <svg {...p}>
        <path d="M18 6 6 18M6 6l12 12" />
      </svg>
    ),
    truck: (
      <svg {...p}>
        <path d="M3 7h11v9H3z" />
        <path d="M14 10h3l4 4v2h-7" />
        <circle cx="7" cy="19" r="2" />
        <circle cx="17" cy="19" r="2" />
      </svg>
    ),
    shield: (
      <svg {...p}>
        <path d="M12 3 5 6v6c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3Z" />
        <path d="m9 12 2 2 4-5" />
      </svg>
    ),
    headset: (
      <svg {...p}>
        <path d="M4 13a8 8 0 0 1 16 0" />
        <path d="M4 13v4a2 2 0 0 0 2 2h1v-7H6a2 2 0 0 0-2 1Z" />
        <path d="M20 13v4a2 2 0 0 1-2 2h-1v-7h1a2 2 0 0 1 2 1Z" />
      </svg>
    ),
    tag: (
      <svg {...p}>
        <path d="M20.59 13.41 13.42 20.58a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82Z" />
        <path d="M7 7h.01" />
      </svg>
    ),
    check: (
      <svg {...p}>
        <path d="M20 6 9 17l-5-5" />
      </svg>
    ),
  };

  return icons[name] || null;
};

const formatPrice = (n) => `₹${Number(n || 0).toLocaleString("en-IN")}`;

const getCart = () => {
  try {
    return JSON.parse(localStorage.getItem("cart")) || [];
  } catch {
    return [];
  }
};

function Toast({ toast }) {
  return (
    <div
      className={`fixed bottom-8 left-1/2 z-[9999] flex -translate-x-1/2 items-center gap-3 rounded-2xl border border-[#dba13a]/40 bg-black/90 px-6 py-4 text-sm font-bold text-[#f7ead8] shadow-[0_30px_90px_rgba(0,0,0,.7)] backdrop-blur-xl transition duration-500 ${
        toast.visible
          ? "translate-y-0 opacity-100"
          : "translate-y-8 opacity-0"
      }`}
    >
      <span className="grid h-6 w-6 place-items-center rounded-full bg-[#dba13a] text-black">
        ✓
      </span>
      {toast.msg}
    </div>
  );
}

export default function Cart() {
  const [cart, setCart] = useState(getCart());
  const [removing, setRemoving] = useState({});
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState("");
  const [toast, setToast] = useState({ visible: false, msg: "" });
  const [checkoutStep, setCheckoutStep] = useState(0);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [customer, setCustomer] = useState({ name: "", contact: "" });
  const [orderSubmitting, setOrderSubmitting] = useState(false);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const subtotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.numericPrice * item.qty, 0),
    [cart]
  );

  const itemCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.qty, 0),
    [cart]
  );

  const discount = couponApplied
    ? Math.round(subtotal * 0.15)
    : Math.round(subtotal * 0.1);

  const total = Math.max(subtotal - discount, 0);
  const freeShippingTarget = 1001;
  const remaining = Math.max(freeShippingTarget - subtotal, 0);
  const progress = Math.min((subtotal / freeShippingTarget) * 100, 100);

  const showToast = (msg) => {
    setToast({ visible: true, msg });
    setTimeout(() => setToast({ visible: false, msg: "" }), 2300);
  };

  const updateQty = (id, type) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              qty:
                type === "plus"
                  ? item.qty + 1
                  : Math.max(item.qty - 1, 1),
            }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setRemoving((prev) => ({ ...prev, [id]: true }));

    setTimeout(() => {
      setCart((prev) => prev.filter((item) => item.id !== id));
      setRemoving((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
      showToast("Item removed from cart");
    }, 420);
  };

  const clearCart = () => {
    if (!cart.length) return;
    if (window.confirm("Clear all cart items?")) {
      setCart([]);
      showToast("Cart cleared");
    }
  };

  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === "GURU15") {
      setCouponApplied(true);
      setCouponError("");
      showToast("Coupon applied successfully");
    } else {
      setCouponApplied(false);
      setCouponError("Invalid coupon code");
    }
  };

  const checkout = () => {
    if (!cart.length) {
      alert("Your cart is empty.");
      return;
    }

    setCheckoutOpen(true);
  };

  const confirmOrder = async () => {
    if (!customer.name.trim()) {
      alert("Please enter your name.");
      return;
    }

    if (!customer.contact.trim()) {
      alert("Please enter your contact number.");
      return;
    }

    try {
      setOrderSubmitting(true);
      setCheckoutStep(1);

      const orderDetails = {
        customerName: customer.name.trim(),
        contactNumber: customer.contact.trim(),
        products: cart.map((item) => ({
          id: item.id,
          name: item.name,
          brand: item.brand || item.category || "",
          price: item.numericPrice,
          qty: item.qty,
          subtotal: item.numericPrice * item.qty,
        })),
        subtotal,
        discount,
        total,
        toEmail: "kaviyarasi1603@gmail.com",
      };

      const res = await fetch("http://localhost:5000/api/send-order-mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderDetails),
      });

      if (!res.ok) {
        throw new Error("Mail sending failed");
      }

      setCheckoutStep(2);
      showToast("Order confirmed. Mail notification sent.");

      setTimeout(() => {
        setCheckoutOpen(false);
        setCheckoutStep(0);
        setCustomer({ name: "", contact: "" });
        setCart([]);
      }, 1800);
    } catch (error) {
      console.error("Order mail error:", error);
      setCheckoutStep(0);
      showToast("Order saved, but mail failed. Check backend email setup.");
    } finally {
      setOrderSubmitting(false);
    }
  };

  return (
    <>
      <style>{`
        @keyframes rise {
          from { opacity: 0; transform: translateY(40px) scale(.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes leftIn {
          from { opacity: 0; transform: translateX(-70px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes rightIn {
          from { opacity: 0; transform: translateX(70px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes glowMove {
          0%,100% { transform: translate(0,0) scale(1); opacity:.45; }
          50% { transform: translate(40px,-25px) scale(1.12); opacity:.9; }
        }

        @keyframes scan {
          0% { transform: translateX(-120%); opacity:0; }
          25% { opacity:1; }
          100% { transform: translateX(120%); opacity:0; }
        }

        @keyframes float {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-14px); }
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @keyframes qtyPop {
          0% { transform: scale(1); }
          50% { transform: scale(1.35); }
          100% { transform: scale(1); }
        }

        @keyframes removeSlide {
          to {
            opacity: 0;
            transform: translateX(-50px) scale(.95);
            max-height: 0;
            padding-top: 0;
            padding-bottom: 0;
          }
        }

        .rise { animation: rise .8s cubic-bezier(.16,1,.3,1) both; }
        .left-in { animation: leftIn .9s cubic-bezier(.16,1,.3,1) both; }
        .right-in { animation: rightIn .9s cubic-bezier(.16,1,.3,1) both; }
        .glow-move { animation: glowMove 8s ease-in-out infinite; }
        .float { animation: float 5s ease-in-out infinite; }
        .spin-slow { animation: spin 18s linear infinite; }
        .qty-pop { animation: qtyPop .28s ease; }
        .remove-slide { animation: removeSlide .42s ease forwards; overflow:hidden; }

        .gold-text {
          background: linear-gradient(90deg,#fff7cb,#dba13a,#8b4d0d,#fff7cb);
          background-size: 240% auto;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: scan 5s linear infinite;
        }

        .shine {
          position: relative;
          overflow: hidden;
        }

        .shine::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(120deg,transparent,rgba(219,161,58,.16),transparent);
          transform: translateX(-120%);
          transition: .9s;
        }

        .shine:hover::after {
          transform: translateX(120%);
        }

        @media (max-width: 1024px) {
          .cart-grid {
            grid-template-columns: 1fr !important;
          }

          .cart-row-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      <Toast toast={toast} />

      {checkoutOpen && (
        <CheckoutModal
          customer={customer}
          setCustomer={setCustomer}
          checkoutStep={checkoutStep}
          orderSubmitting={orderSubmitting}
          onClose={() => {
            if (!orderSubmitting) {
              setCheckoutOpen(false);
              setCheckoutStep(0);
            }
          }}
          onConfirm={confirmOrder}
        />
      )}

      <main className="min-h-screen bg-[#070401] text-white">
        <Header cartCount={itemCount} />

        <Hero itemCount={itemCount} />

        {cart.length > 0 && (
          <FreeShipping
            remaining={remaining}
            progress={progress}
          />
        )}

        <section className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="cart-grid mx-auto grid max-w-[1450px] grid-cols-[1fr_410px] gap-8">
            <div className="space-y-6">
              {cart.length > 0 && (
                <div className="hidden grid-cols-[2fr_.7fr_.8fr_.8fr_.2fr] rounded-3xl border border-[#dba13a]/20 bg-[#dba13a]/10 px-6 py-4 text-xs font-black uppercase tracking-[4px] text-[#dba13a] lg:grid">
                  <span>Product</span>
                  <span>Price</span>
                  <span>Qty</span>
                  <span>Subtotal</span>
                  <span></span>
                </div>
              )}

              <div className="overflow-hidden rounded-[34px] border border-[#dba13a]/25 bg-black/45 backdrop-blur-xl">
                {cart.length === 0 ? (
                  <EmptyCart />
                ) : (
                  cart.map((item, index) => (
                    <CartRow
                      key={item.id}
                      item={item}
                      index={index}
                      removing={!!removing[item.id]}
                      onQtyChange={updateQty}
                      onRemove={removeItem}
                    />
                  ))
                )}

                {cart.length > 0 && (
                  <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#dba13a]/15 p-6">
                    <Link
                      to="/products"
                      className="flex items-center gap-2 rounded-full border border-[#dba13a]/35 px-6 py-3 text-sm font-black uppercase tracking-[3px] text-[#dba13a] transition duration-500 hover:-translate-y-1 hover:bg-[#dba13a] hover:text-black"
                    >
                      <Icon name="back" size={16} />
                      Continue Shopping
                    </Link>

                    <button
                      onClick={clearCart}
                      className="flex items-center gap-2 rounded-full border border-red-400/35 px-6 py-3 text-sm font-black uppercase tracking-[3px] text-red-300 transition duration-500 hover:-translate-y-1 hover:bg-red-500 hover:text-white"
                    >
                      <Icon name="trash" size={16} />
                      Clear Cart
                    </button>
                  </div>
                )}
              </div>
            </div>

            <OrderSummary
              itemCount={itemCount}
              subtotal={subtotal}
              discount={discount}
              total={total}
              coupon={coupon}
              setCoupon={setCoupon}
              couponApplied={couponApplied}
              setCouponApplied={setCouponApplied}
              couponError={couponError}
              applyCoupon={applyCoupon}
              checkout={checkout}
              checkoutStep={checkoutStep}
            />
          </div>
        </section>

        <CartFooter />
        <TrustStrip />
      </main>
    </>
  );
}

function Hero({ itemCount }) {
  return (
    <section className="relative overflow-hidden border-b border-[#3b260e] bg-[#120a04]">
      <img
        src={cartHero}
        alt=""
        className="absolute inset-0 h-full w-full scale-110 object-cover opacity-40"
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(219,161,58,.18),transparent_35%),linear-gradient(135deg,rgba(8,5,2,.96),rgba(8,5,2,.75),rgba(8,5,2,.45))]" />

      <div className="glow-move absolute right-[10%] top-1/2 h-[320px] w-[320px] -translate-y-1/2 rounded-full bg-[#dba13a]/15 blur-[110px]" />

      <div className="relative mx-auto flex min-h-[330px] max-w-[1450px] items-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="left-in">
          <div className="mb-5 flex w-fit items-center gap-3 rounded-full border border-[#dba13a]/30 bg-black/55 px-5 py-3 backdrop-blur-xl">
            <Icon name="tag" size={16} className="text-[#dba13a]" />
            <p className="text-xs font-black uppercase tracking-[5px] text-[#dba13a]">
              Premium Cart System
            </p>
          </div>

          <h1 className="font-serif text-5xl font-black leading-none sm:text-6xl lg:text-7xl">
            Shopping <span className="gold-text">Cart</span>
          </h1>

          <p className="mt-5 text-sm font-bold text-[#eadcc2]">
            Home <span className="mx-3 text-[#dba13a]">›</span>
            <span className="text-[#dba13a]">Cart</span>
            {itemCount > 0 && (
              <span className="ml-4 rounded-full border border-[#dba13a]/40 bg-[#dba13a]/15 px-4 py-1 text-[#dba13a]">
                {itemCount} items
              </span>
            )}
          </p>
        </div>
      </div>
    </section>
  );
}

function FreeShipping({ remaining, progress }) {
  return (
    <section className="px-4 pt-8 sm:px-6 lg:px-8">
      <div className="rise mx-auto max-w-[1450px] rounded-[28px] border border-[#dba13a]/25 bg-black/55 p-5 backdrop-blur-xl">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="float grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-[#dba13a] text-black">
            <Icon name="truck" size={34} />
          </div>

          <div className="flex-1">
            <p className="mb-3 text-sm font-bold text-[#eadcc2]">
              {remaining > 0 ? (
                <>
                  Add{" "}
                  <span className="font-black text-[#dba13a]">
                    {formatPrice(remaining)}
                  </span>{" "}
                  more for free shipping.
                </>
              ) : (
                <span className="font-black text-green-400">
                  You unlocked free shipping.
                </span>
              )}
            </p>

            <div className="h-3 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#dba13a] to-[#fff1b3] transition-all duration-700"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function EmptyCart() {
  return (
    <div className="rise p-12 text-center sm:p-20">
      <div className="float mx-auto mb-7 grid h-28 w-28 place-items-center rounded-full border border-[#dba13a]/30 bg-[#dba13a]/10 text-6xl">
        🛒
      </div>

      <h2 className="font-serif text-4xl font-black text-[#dba13a]">
        Your cart is empty
      </h2>

      <p className="mx-auto mt-4 max-w-[420px] text-sm leading-7 text-[#d8c8b1]">
        Looks like you have not added anything yet. Explore products and add
        your favorite items.
      </p>

      <Link
        to="/products"
        className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#dba13a] px-8 py-4 font-black text-black transition duration-500 hover:-translate-y-2 hover:bg-white"
      >
        <Icon name="back" size={18} />
        Continue Shopping
      </Link>
    </div>
  );
}

function CartRow({ item, index, removing, onQtyChange, onRemove }) {
  const [pop, setPop] = useState(false);

  const changeQty = (type) => {
    setPop(true);
    setTimeout(() => setPop(false), 280);
    onQtyChange(item.id, type);
  };

  return (
    <div
      className={`cart-row-grid rise grid grid-cols-[2fr_.7fr_.8fr_.8fr_.2fr] items-center gap-4 border-b border-[#dba13a]/15 p-6 transition duration-500 hover:bg-[#dba13a]/5 ${
        removing ? "remove-slide" : ""
      }`}
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      <div className="flex items-center gap-5">
        <div className="relative shrink-0 rounded-2xl bg-white p-3">
          <img
            src={item.image}
            alt={item.name}
            className="h-20 w-20 object-contain"
          />
        </div>

        <div>
          <h3 className="max-w-[280px] text-sm font-bold leading-6 text-[#f7ead8]">
            {item.name}
          </h3>
          <p className="mt-1 text-xs text-[#d8c8b1]">
            {item.brand || item.category}
          </p>
          <p className="mt-2 flex items-center gap-2 text-xs font-bold text-green-400">
            <span className="h-2 w-2 rounded-full bg-green-400" />
            In Stock
          </p>
        </div>
      </div>

      <p className="text-lg font-black text-white">
        {formatPrice(item.numericPrice)}
      </p>

      <div className="flex w-[120px] overflow-hidden rounded-2xl border border-[#dba13a]/25 bg-black/60">
        <button
          onClick={() => changeQty("minus")}
          className="h-11 w-10 text-xl text-[#d8c8b1] transition hover:bg-[#dba13a] hover:text-black"
        >
          −
        </button>

        <span
          className={`grid flex-1 place-items-center font-black text-white ${
            pop ? "qty-pop" : ""
          }`}
        >
          {item.qty}
        </span>

        <button
          onClick={() => changeQty("plus")}
          className="h-11 w-10 text-xl text-[#d8c8b1] transition hover:bg-[#dba13a] hover:text-black"
        >
          +
        </button>
      </div>

      <p className="text-lg font-black text-[#dba13a]">
        {formatPrice(item.numericPrice * item.qty)}
      </p>

      <button
        onClick={() => onRemove(item.id)}
        className="grid h-10 w-10 place-items-center rounded-xl border border-red-400/25 text-red-300 transition duration-500 hover:rotate-90 hover:bg-red-500 hover:text-white"
      >
        <Icon name="x" size={18} />
      </button>
    </div>
  );
}

function CheckoutModal({
  customer,
  setCustomer,
  checkoutStep,
  orderSubmitting,
  onClose,
  onConfirm,
}) {
  return (
    <div className="fixed inset-0 z-[9998] grid place-items-center bg-black/80 px-4 backdrop-blur-sm">
      <div className="rise w-full max-w-[520px] overflow-hidden rounded-[34px] border border-[#dba13a]/35 bg-[#080501] shadow-[0_40px_130px_rgba(0,0,0,.85)]">
        <div className="relative p-7">
          <div className="absolute -right-24 -top-24 h-56 w-56 rounded-full bg-[#dba13a]/20 blur-[80px]" />

          <div className="relative flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[4px] text-[#dba13a]">
                Checkout Details
              </p>
              <h2 className="mt-2 font-serif text-3xl font-black text-white">
                Confirm Order
              </h2>
              <p className="mt-2 text-sm text-[#d8c8b1]">
                Enter name and contact number to place your order.
              </p>
            </div>

            <button
              onClick={onClose}
              disabled={orderSubmitting}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-[#dba13a]/25 text-[#dba13a] transition hover:bg-[#dba13a] hover:text-black disabled:opacity-50"
            >
              <Icon name="x" size={18} />
            </button>
          </div>

          <div className="relative mt-7 space-y-4">
            <input
              value={customer.name}
              onChange={(e) =>
                setCustomer((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="Enter your name"
              className="w-full rounded-2xl border border-[#dba13a]/25 bg-black/55 px-5 py-4 text-sm font-bold text-white outline-none placeholder:text-[#9d8664] transition focus:border-[#dba13a] focus:shadow-[0_0_35px_rgba(219,161,58,.18)]"
            />

            <input
              value={customer.contact}
              onChange={(e) =>
                setCustomer((prev) => ({ ...prev, contact: e.target.value }))
              }
              placeholder="Enter contact number"
              className="w-full rounded-2xl border border-[#dba13a]/25 bg-black/55 px-5 py-4 text-sm font-bold text-white outline-none placeholder:text-[#9d8664] transition focus:border-[#dba13a] focus:shadow-[0_0_35px_rgba(219,161,58,.18)]"
            />

            <button
              onClick={onConfirm}
              disabled={orderSubmitting}
              className="flex w-full items-center justify-center gap-3 rounded-2xl bg-[#dba13a] px-6 py-4 font-black uppercase tracking-[2px] text-black transition duration-500 hover:-translate-y-1 hover:bg-white disabled:cursor-not-allowed disabled:opacity-70"
            >
              {checkoutStep === 0 && "OK"}
              {checkoutStep === 1 && "Sending Mail..."}
              {checkoutStep === 2 && "Order Confirmed ✓"}
            </button>

            <p className="text-center text-xs font-bold text-[#d8c8b1]">
              Mail notification will be sent to kaviyarasi1603@gmail.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function OrderSummary({
  itemCount,
  subtotal,
  discount,
  total,
  coupon,
  setCoupon,
  couponApplied,
  setCouponApplied,
  couponError,
  applyCoupon,
  checkout,
  checkoutStep,
}) {
  return (
    <aside className="summary-card sticky top-6 h-fit rounded-[34px] border border-[#dba13a]/25 bg-black/60 p-7 shadow-[0_40px_120px_rgba(0,0,0,.65)] backdrop-blur-xl">
      <h2 className="font-serif text-3xl font-black text-[#dba13a]">
        Order Summary
      </h2>


      <div className="mt-7 space-y-4 border-t border-[#dba13a]/15 pt-6">
        <SummaryRow label={`Subtotal (${itemCount} items)`} value={formatPrice(subtotal)} />
        <SummaryRow label="Shipping" value="FREE" green />
        <SummaryRow label={couponApplied ? "Discount (GURU15)" : "Discount"} value={`-${formatPrice(discount)}`} green />
      </div>

      <div className="mt-7 border-t border-[#dba13a]/15 pt-6">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-sm font-bold text-[#d8c8b1]">Total Amount</p>
            <p className="text-xs text-[#9d8664]">Incl. all taxes</p>
          </div>

          <h3 className="font-serif text-4xl font-black text-[#dba13a]">
            {formatPrice(total)}
          </h3>
        </div>

        <button
          onClick={checkout}
          className="mt-7 flex w-full items-center justify-center gap-3 rounded-2xl bg-[#dba13a] px-6 py-4 font-black uppercase tracking-[2px] text-black transition duration-500 hover:-translate-y-2 hover:bg-white"
        >
          {checkoutStep === 0 && (
            <>
              Proceed Checkout <Icon name="arrow" size={18} />
            </>
          )}
          {checkoutStep === 1 && "Processing..."}
          {checkoutStep === 2 && "Order Confirmed ✓"}
        </button>

        <Link
          to="/services"
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl border border-[#dba13a]/35 px-6 py-3 text-sm font-black uppercase tracking-[2px] text-[#dba13a] transition hover:bg-[#dba13a] hover:text-black"
        >
          <Icon name="check" size={16} />
          Request Service
        </Link>
      </div>

      <div className="mt-7 space-y-4 border-t border-[#dba13a]/15 pt-6">
        {[
          ["shield", "Secure Checkout", "Safe payment process"],
          ["truck", "Fast Delivery", "Quick and reliable delivery"],
          ["headset", "24/7 Support", "Always here to help"],
        ].map(([icon, title, text]) => (
          <div key={title} className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#dba13a]/10 text-[#dba13a]">
              <Icon name={icon} size={20} />
            </div>
            <div>
              <p className="text-sm font-black text-[#e4ad4d]">{title}</p>
              <p className="text-xs text-[#d8c8b1]">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}

function SummaryRow({ label, value, green }) {
  return (
    <div className="flex items-center justify-between text-sm text-[#eadcc2]">
      <span>{label}</span>
      <span className={`font-black ${green ? "text-green-400" : "text-white"}`}>
        {value}
      </span>
    </div>
  );
}

function CartFooter() {
  const cols = [
    ["Quick Links", ["Home", "Products", "Services", "About Us", "Contact"]],
    ["Categories", ["Laptop Spares", "Computer Parts", "Gaming Zone", "CCTV Cameras"]],
    ["Services", ["Computer Repair", "CCTV Installation", "Solar Installation", "Desktop Service"]],
  ];

  return (
    <footer className="border-t border-[#3b260e] bg-[#120a04] px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-[1450px] grid-cols-1 gap-8 text-sm text-[#e7d8c2] sm:grid-cols-2 lg:grid-cols-5">
        <div>
          <h3 className="font-serif text-3xl font-black text-[#dba13a]">
            GURUTRONICS
          </h3>
          <p className="mt-4 leading-7 text-[#b8a892]">
            Your one-stop destination for all tech products, services and
            reliable solutions.
          </p>
        </div>

        {cols.map(([title, items]) => (
          <div key={title}>
            <h4 className="mb-5 font-serif text-xl font-black text-[#dba13a]">
              {title}
            </h4>
            <ul className="space-y-3">
              {items.map((item) => (
                <li
                  key={item}
                  className="cursor-pointer text-[#b8a892] transition hover:translate-x-2 hover:text-[#dba13a]"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h4 className="mb-5 font-serif text-xl font-black text-[#dba13a]">
            Contact Us
          </h4>
          <p>+91 98765 43210</p>
          <p className="mt-3">info@gurutronics.com</p>
          <p className="mt-3">Chennai, Tamil Nadu</p>
        </div>
      </div>
    </footer>
  );
}

function TrustStrip() {
  const items = [
    ["Secure Payments", "100% safe checkout", "shield"],
    ["Fast Delivery", "Quick and reliable", "truck"],
    ["24/7 Support", "Always here to help", "headset"],
  ];

  return (
    <section className="bg-[#211306] px-4 py-7 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-[1450px] grid-cols-1 gap-4 sm:grid-cols-3">
        {items.map(([title, sub, icon]) => (
          <div
            key={title}
            className="shine rounded-[24px] border border-[#dba13a]/20 bg-black/25 p-5 text-center transition hover:-translate-y-2"
          >
            <Icon name={icon} size={34} className="mx-auto text-[#dba13a]" />
            <h4 className="mt-3 font-black text-[#e4ad4d]">{title}</h4>
            <p className="mt-1 text-sm text-[#e7d4b9]">{sub}</p>
          </div>
        ))}
      </div>
    </section>
  );
}