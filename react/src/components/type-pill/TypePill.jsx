import styles from "./TypePill.module.scss";

const TypePill = ({ type, onClick, selectedType }) => {
  const handleClick = () => {
    // Call the provided onClick function and pass the type
    if (onClick) {
      onClick(type);
    }
  };
  return (
    <button
      onClick={handleClick}
      className={`${styles[type.name]} ${styles["type-pill"]} ${
        selectedType === type.id ? styles[`active`] : ``
      }`}
    >
      {type.name}
    </button>
  );
};

export default TypePill;
