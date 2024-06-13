import React, { useState, useEffect } from 'react';

const OrderModal = ({ isOpen, onClose, order, onSave, readOnly }) => {
  const [formState, setFormState] = useState(order || {
    customer_id: '',
    items: [{ sku_id: '', price: '', quantity: '' }],
    paid: false,
    invoice_no: '',
    invoice_date: ''
  });

  useEffect(() => {
    if (order) {
      setFormState(order);
    }
  }, [order]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const items = formState.items.map((item, i) => 
      i === index ? { ...item, [name]: value } : item
    );
    setFormState((prev) => ({ ...prev, items }));
  };

  const handleAddItem = () => {
    setFormState((prev) => ({
      ...prev,
      items: [...prev.items, { sku_id: '', price: '', quantity: '' }]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formState);
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Customer ID</label>
            <input type="number" name="customer_id" value={formState.customer_id} onChange={handleInputChange} required readOnly={readOnly} />
          </div>
          <div>
            <label>Invoice No</label>
            <input type="text" name="invoice_no" value={formState.invoice_no} onChange={handleInputChange} required readOnly={readOnly} />
          </div>
          <div>
            <label>Invoice Date</label>
            <input type="date" name="invoice_date" value={formState.invoice_date} onChange={handleInputChange} required readOnly={readOnly} />
          </div>
          {formState.items.map((item, index) => (
            <div key={index}>
              <label>SKU ID</label>
              <input type="number" name="sku_id" value={item.sku_id} onChange={(e) => handleItemChange(index, e)} required readOnly={readOnly} />
              <label>Price</label>
              <input type="number" name="price" value={item.price} onChange={(e) => handleItemChange(index, e)} required readOnly={readOnly} />
              <label>Quantity</label>
              <input type="number" name="quantity" value={item.quantity} onChange={(e) => handleItemChange(index, e)} required readOnly={readOnly} />
            </div>
          ))}
          {!readOnly && <button type="button" onClick={handleAddItem}>Add Item</button>}
          {!readOnly && <button type="submit">Save</button>}
        </form>
      </div>
    </div>
  );
};

export default OrderModal;
