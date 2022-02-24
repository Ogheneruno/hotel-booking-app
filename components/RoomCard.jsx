import Image from "next/image";
import styles from "../styles/RoomCard.module.css";
import Link from "next/link";

const RoomCard = ({ room }) => {
  return (
    <div className={styles.container}>
      <Link href={`/room/${room._id}`} passHref>
        <Image src={room.img} alt="" width="500" height="500" />
      </Link>
      <h1 className={styles.title}>{room.title}</h1>
      <span className={styles.price}>${room.prices[0]}</span>
      <p className={styles.desc}>{room.desc}</p>
    </div>
  );
};

export default RoomCard;
