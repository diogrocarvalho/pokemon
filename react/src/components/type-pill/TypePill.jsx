import styles from "./TypePill.module.scss";

const TypePill = ({ type }) => {
  return (
    <div className={`${styles[type.name]} ${styles["type-pill"]} `}>
      {type.name}
    </div>
  );
};

export default TypePill;
