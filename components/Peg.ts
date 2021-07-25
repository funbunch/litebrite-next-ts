

export default props => {
  const activeClass = props.isActive ? "peg--active" : "";
  const colorClass = `peg--${props.color}`;
  return (
    <div
      onClick={() => props.onClick()}
      className={`peg ${activeClass} ${colorClass}`}
    />
  );
};
