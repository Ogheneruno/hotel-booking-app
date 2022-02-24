import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import styles from "../../styles/Admin.module.css";

const Index = ({ orders, products }) => {
  const [roomList, setRoomList] = useState(products);
  const [bookingList, setBookingList] = useState(orders);
  const status = ["preparing", "on the way", "delivered"];

  const handleDelete = async (id) => {
    console.log(id);
    try {
      const res = await axios.delete(
        "http://localhost:3000/api/products/" + id
      );
      setRoomList(roomList.filter((room) => rooom._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleStatus = async (id) => {
    const item = bookingList.filter((booking) => booking._id === id)[0];
    const currentStatus = item.status;

    try {
      const res = await axios.put("http://localhost:3000/api/orders/" + id, {
        status: currentStatus + 1,
      });
      setBookingList([
        res.data,
        ...bookingList.filter((booking) => booking._id !== id),
      ]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <h1 className={styles.title}>Rooms</h1>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Image</th>
              <th>Id</th>
              <th>Title</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </tbody>
          {roomList.map((room) => (
            <tbody key={room._id}>
              <tr className={styles.trTitle}>
                <td>
                  <Image
                    src={room.img}
                    width={50}
                    height={50}
                    objectFit="cover"
                    alt=""
                  />
                </td>
                <td>{room._id.slice(0, 5)}...</td>
                <td>{room.title}</td>
                <td>${room.prices[0]}</td>
                <td>
                  <button className={styles.button}>Edit</button>
                  <button
                    className={styles.button}
                    onClick={() => handleDelete(room._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
      <div className={styles.item}>
        <h1 className={styles.title}>Bookings</h1>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Id</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </tbody>
          {bookingList.map((booking) => (
            <tbody key={booking._id}>
              <tr className={styles.trTitle}>
                <td>{booking._id.slice(0, 5)}...</td>
                <td>{booking.customer}</td>
                <td>${booking.total}</td>
                <td>
                  {booking.method === 0 ? <span>cash</span> : <span>paid</span>}
                </td>
                <td>{status[booking.status]}</td>
                <td>
                  <button onClick={() => handleStatus(booking._id)}>
                    Next Stage
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";

  if (myCookie.token !== process.env.TOKEN) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }

  const roomRes = await axios.get("http://localhost:3000/api/rooms");
  const bookingRes = await axios.get("http://localhost:3000/api/bookings");

  return {
    props: {
      orders: bookingRes.data,
      products: roomRes.data,
    },
  };
};

export default Index;
