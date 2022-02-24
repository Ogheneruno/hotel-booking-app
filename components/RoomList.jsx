import styles from "../styles/RoomList.module.css";
import RoomCard from "./RoomCard";

const RoomList = ({ roomList }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>THE BEST BEACH RESORT IN TOWN</h1>
      <p className={styles.desc}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut blandit arcu
        in pretium molestie. Interdum et malesuada fames acme. Lorem ipsum dolor
        sit amet, consectetur adipiscing elit.
      </p>
      <div className={styles.wrapper}>
        {roomList.map((room) => (
          <RoomCard key={room._id} room={room} />
        ))}
      </div>
    </div>
  );
};

export default RoomList;
