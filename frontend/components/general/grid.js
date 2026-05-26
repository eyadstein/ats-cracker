const Grid = ({ children, cols,className, ...props }) => {
  const getGridColsClass = (cols) => {
    if (typeof cols === 'number') {
      return `grid-cols-${cols}`;
    } else if (typeof cols === 'string') {
      return `grid-cols-[${cols}]`;
    }
    return '';
  };

  const gridColsClass = getGridColsClass(cols);

  return <div className={`grid items-center ${gridColsClass} ${className}`} {...props}>{children}</div>;
};

export default Grid;