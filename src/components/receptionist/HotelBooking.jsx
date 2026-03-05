import React, { useContext, useState } from "react";
import { HotelContext } from "../../context/HotelContext"; // ✅ Correct context
import "./ReceptionistStyles.css";
const HotelBooking = () => {
  const { hotelBookings, setHotelBookings } = useContext(HotelContext);

  const [newBooking, setNewBooking] = useState({
    customer: "",
    petName: "",
    petType: "Dog",
    room: "",
    checkIn: "",
    checkOut: "",
    status: "Pending",
    price: 0
  });

  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const handleChange = (e) =>
    setNewBooking({ ...newBooking, [e.target.name]: e.target.value });

  const handleEditChange = (e) =>
    setEditData({ ...editData, [e.target.name]: e.target.value });

  const handleCreateBooking = () => {
    const id = hotelBookings.length + 1;
    setHotelBookings([...hotelBookings, { id, ...newBooking }]);
    setNewBooking({
      customer: "",
      petName: "",
      petType: "Dog",
      room: "",
      checkIn: "",
      checkOut: "",
      status: "Pending",
      price: 0
    });
  };

  const startEdit = (booking) => {
    setEditingId(booking.id);
    setEditData(booking);
  };

  const saveEdit = () => {
    setHotelBookings(
      hotelBookings.map((b) => (b.id === editingId ? editData : b))
    );
    setEditingId(null);
  };

  const deleteBooking = (id) => {
    setHotelBookings(hotelBookings.filter((b) => b.id !== id));
  };

  const updateStatus = (id, newStatus) => {
    setHotelBookings(
      hotelBookings.map((b) =>
        b.id === id ? { ...b, status: newStatus } : b
      )
    );
  };

  return (
    <div className="hotel-booking">
      <h2>Hotel Booking</h2>

      {/* Create Form */}
      <div className="form-section">
        <h3>Create New Booking</h3>
        <div className="form-grid">
          <input type="text" name="customer" placeholder="Customer Name" value={newBooking.customer} onChange={handleChange} />
          <input type="text" name="petName" placeholder="Pet Name" value={newBooking.petName} onChange={handleChange} />
          <select name="petType" value={newBooking.petType} onChange={handleChange}>
            <option value="Dog">Dog</option>
            <option value="Cat">Cat</option>
          </select>
          <input type="text" name="room" placeholder="Room Number" value={newBooking.room} onChange={handleChange} />
          <input type="date" name="checkIn" value={newBooking.checkIn} onChange={handleChange} />
          <input type="date" name="checkOut" value={newBooking.checkOut} onChange={handleChange} />
          <input type="number" name="price" placeholder="Price (₱)" value={newBooking.price} onChange={handleChange} />
          <select name="status" value={newBooking.status} onChange={handleChange}>
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Completed">Completed</option>
          </select>
          <button className="create-btn" onClick={handleCreateBooking}>Create Booking</button>
        </div>
      </div>

      {/* Current Bookings */}
      <div className="table-section">
        <h3>Current Bookings</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th><th>Customer</th><th>Pet</th><th>Type</th>
              <th>Check-In</th><th>Check-Out</th><th>Room</th>
              <th>Status</th><th>Price</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {hotelBookings.map((b) => (
              <tr key={b.id}>
                {editingId === b.id ? (
                  <>
                    <td>{b.id}</td>
                    <td><input name="customer" value={editData.customer} onChange={handleEditChange} /></td>
                    <td><input name="petName" value={editData.petName} onChange={handleEditChange} /></td>
                    <td>
                      <select name="petType" value={editData.petType} onChange={handleEditChange}>
                        <option value="Dog">Dog</option>
                        <option value="Cat">Cat</option>
                      </select>
                    </td>
                    <td><input type="date" name="checkIn" value={editData.checkIn} onChange={handleEditChange} /></td>
                    <td><input type="date" name="checkOut" value={editData.checkOut} onChange={handleEditChange} /></td>
                    <td><input name="room" value={editData.room} onChange={handleEditChange} /></td>
                    <td>
                      <select name="status" value={editData.status} onChange={handleEditChange}>
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </td>
                    <td><input type="number" name="price" value={editData.price} onChange={handleEditChange} /></td>
                    <td>
                      <button onClick={saveEdit}>Save</button>
                      <button onClick={() => setEditingId(null)}>Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{b.id}</td><td>{b.customer}</td><td>{b.petName}</td><td>{b.petType}</td>
                    <td>{b.checkIn}</td><td>{b.checkOut}</td><td>{b.room}</td><td>{b.status}</td>
                    <td>₱{b.price?.toLocaleString()}</td>
                    <td>
                      <button onClick={() => startEdit(b)}>Edit</button>
                      <button onClick={() => deleteBooking(b.id)}>Delete</button>
                      {b.status === "Pending" && (
                        <button onClick={() => updateStatus(b.id, "Confirmed")}>Approve</button>
                      )}
                      {b.status === "Confirmed" && (
                        <button onClick={() => updateStatus(b.id, "Completed")}>Complete</button>
                      )}
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HotelBooking;