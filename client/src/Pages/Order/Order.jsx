import React, { useEffect, useState } from "react";
import api from "../../api";

export default function Order() {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showOption, setShowOption] = useState(false);
  const [options, setOptions] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [optionSelections, setOptionSelections] = useState({});
  const [cart, setCart] = useState([]);

  const baseURL = "http://localhost:5214";

  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCategory = async () => {
    try {
      const res = await api.get("/Category");
      if (res.status === 200) setCategories(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchItems = async (name, id) => {
    try {
      const res = await api.get(`/Menu/category/${id}`);
      if (res.status === 200) {
        setSelectedCategory(name);
        setItems(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = (hasOption, item) => {
    if (hasOption) {
      setOptions(item.options);
      setSelectedItem(item);
      setOptionSelections({});
      setShowOption(true);
    } else {
      addToCart({
        ...item,
        selectedMeta: null,
        quantity: 1,
        price: item.price,
      });
    }
  };

  const handleOptionChange = (option, meta, checked) => {
    setOptionSelections((prev) => {
      const prevSelection = prev[option.optionName] || {};
      if (option.optionType === "single") {
        return { ...prev, [option.optionName]: { selectedMeta: meta } };
      } else {
        const metas = prevSelection.selectedMeta || [];
        let updatedMetas;
        if (checked) {
          updatedMetas = [...metas, meta];
        } else {
          updatedMetas = metas.filter((m) => m.metaKey !== meta.metaKey);
        }
        return { ...prev, [option.optionName]: { selectedMeta: updatedMetas } };
      }
    });
  };

  const calculateOptionPrice = (selections) => {
    let total = 0;
    for (const key in selections) {
      const sel = selections[key].selectedMeta;
      if (Array.isArray(sel))
        total += sel.reduce((sum, m) => sum + parseFloat(m.metaValue), 0);
      else if (sel) total += parseFloat(sel.metaValue);
    }
    return total;
  };

  const generateMetaKey = (selectedMeta) => {
    if (!selectedMeta) return "";
    return Object.entries(selectedMeta)
      .map(([optName, sel]) =>
        Array.isArray(sel.selectedMeta)
          ? sel.selectedMeta
              .map((m) => `${optName}:${m.metaKey}`)
              .sort()
              .join("|")
          : `${optName}:${sel.selectedMeta.metaKey}`
      )
      .sort()
      .join("||");
  };

  const confirmAddToCart = () => {
    const basePrice = selectedItem.price;
    const optionsPrice = calculateOptionPrice(optionSelections);
    const itemToAdd = {
      ...selectedItem,
      selectedMeta: optionSelections,
      quantity: 1,
      price: basePrice + optionsPrice,
      metaKey: generateMetaKey(optionSelections),
    };

    addToCart(itemToAdd);
    setShowOption(false);
    setSelectedItem(null);
    setOptions([]);
    setOptionSelections({});
  };

  const addToCart = (itemToAdd) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (p) => p.id === itemToAdd.id && p.metaKey === itemToAdd.metaKey
      );

      if (existingIndex >= 0) {
        // Item already exists, don't add another one
        return prevCart;
      } else {
        // Item doesn't exist, add it with quantity 1
        return [...prevCart, itemToAdd];
      }
    });
    console.log(cart);
  };

  const increaseQty = (index) => {
    setCart((prevCart) => {
      const updated = [...prevCart];
      updated[index] = {
        ...updated[index],
        quantity: updated[index].quantity + 1,
      };
      return updated;
    });
  };

  const decreaseQty = (index) => {
    setCart((prevCart) => {
      const updated = [...prevCart];
      if (updated[index].quantity > 1) {
        updated[index] = {
          ...updated[index],
          quantity: updated[index].quantity - 1,
        };
        return updated;
      } else {
        return prevCart.filter((_, i) => i !== index);
      }
    });
  };

  const removeItem = (index) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  const total = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);

  const createOrder = async () => {
    const order = {
      UserId: 1,
      Total: total,
      Status: "Processing",
      Items: cart.map((item) => ({
        ProductName: item.name,
        categoryId: item.categoryId,
        Quantity: item.quantity,
        Price: item.price,
      })),
    };

    try {
      console.log(order)
      const res = await api.post("/Order", order);
      if(res.status === 200) {
        alert("Order placed successfully!");
        setCart([]);
        setSelectedItem(null)
      }
      //console.log("Order created", res);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-[100vw] relative p-4">
      {/* Option Modal */}
      {showOption && (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md w-[90%] md:w-[50%] max-h-[90vh] overflow-auto">
            <h2 className="text-xl font-bold mb-3">
              {selectedItem?.name} - Choose Options
            </h2>
            {options.map((opt, i) => (
              <div key={i} className="mb-4">
                <p className="font-semibold mb-2">{opt.optionName}</p>
                <div className="flex flex-col gap-2">
                  {opt.metas.map((meta, idx) => {
                    const selected =
                      optionSelections[opt.optionName]?.selectedMeta;
                    const isChecked =
                      opt.optionType === "single"
                        ? selected?.metaKey === meta.metaKey
                        : selected?.some((m) => m.metaKey === meta.metaKey);
                    return (
                      <label
                        key={idx}
                        className="flex items-center gap-2 border p-2 rounded hover:bg-gray-100"
                      >
                        <input
                          type={
                            opt.optionType === "single" ? "radio" : "checkbox"
                          }
                          name={opt.optionName}
                          checked={isChecked || false}
                          onChange={(e) =>
                            handleOptionChange(opt, meta, e.target.checked)
                          }
                        />
                        <span>
                          {meta.metaKey} - BDT {meta.metaValue}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            ))}
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowOption(false)}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={confirmAddToCart}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Categories */}
      <div className="flex flex-wrap gap-3 p-3 w-full mb-6">
        {categories?.map((item, key) => (
          <button
            key={key}
            onClick={() => fetchItems(item.name, item.id)}
            className={`${
              selectedCategory === item.name
                ? "bg-[#ED7F23] text-black"
                : "bg-black text-white"
            } p-2 rounded-md text-[18px]`}
          >
            {item.name}
          </button>
        ))}
      </div>

      {/* Products & Cart */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Products */}
        <div className="w-full lg:w-[60%]">
          <h1 className="text-2xl font-bold mb-3">{selectedCategory}</h1>
          {items?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {items.map((item, key) => (
                <div className="item-card border rounded p-3" key={key}>
                  <img
                    src={baseURL + item.image}
                    alt={item.name}
                    height={150}
                    className="mb-2 w-full"
                  />
                  <p className="font-semibold">{item.name}</p>
                  <p>BDT {item.price}</p>
                  <button
                    onClick={() => handleClick(item.options?.length > 0, item)}
                    className="mt-2 px-3 py-1 bg-blue-500 text-white rounded"
                  >
                    {item.options?.length > 0 ? "Select Option" : "Add To Cart"}
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <>No Items Available</>
          )}
        </div>

        {/* Cart */}
        <div className="w-full lg:w-[40%] border rounded p-4 h-fit">
          <h2 className="text-xl font-bold mb-4">Cart Summary</h2>
          {cart.length > 0 ? (
            <div className="flex flex-col gap-3">
              {cart.map((c, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center border-b pb-2"
                >
                  <div>
                    <p className="font-semibold">
                      {c.name}{" "}
                      {c.selectedMeta &&
                        Object.entries(c.selectedMeta).map(([optName, sel]) => (
                          <span key={optName}>
                            ({optName}:{" "}
                            {Array.isArray(sel.selectedMeta)
                              ? sel.selectedMeta
                                  .map((m) => m.metaKey)
                                  .join(", ")
                              : sel.selectedMeta.metaKey}
                            )
                          </span>
                        ))}
                    </p>
                    <p>BDT {c.price}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => decreaseQty(i)}
                      className="px-2 py-1 bg-gray-200 rounded"
                    >
                      -
                    </button>
                    <span>{c.quantity}</span>
                    <button
                      onClick={() => increaseQty(i)}
                      className="px-2 py-1 bg-gray-200 rounded"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeItem(i)}
                      className="px-2 py-1 bg-red-500 text-white rounded"
                    >
                      x
                    </button>
                  </div>
                </div>
              ))}
              <div className="flex justify-between items-center mt-4 font-bold text-lg">
                <span>Total:</span>
                <span>BDT {total}</span>
              </div>
              <button
                className="mt-2 w-full bg-green-500 text-white py-2 rounded"
                onClick={createOrder}
              >
                Place Order
              </button>
            </div>
          ) : (
            <p>No items in cart</p>
          )}
        </div>
      </div>
    </div>
  );
}
