export const Card = ({
  children,
  className = '',
  hover = false,
  ...props
}) => {
  const baseStyles = 'bg-white rounded-lg border border-gray-200 shadow-sm p-6';
  const hoverStyles = hover ? 'hover:shadow-lg hover:border-gray-300 transition-all duration-200 cursor-pointer' : '';
  const combinedClassName = `${baseStyles} ${hoverStyles} ${className}`;

  return (
    <div className={combinedClassName} {...props}>
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = '' }) => (
  <div className={`mb-4 pb-4 border-b border-gray-200 ${className}`}>
    {children}
  </div>
);

export const CardTitle = ({ children, className = '' }) => (
  <h3 className={`text-xl font-bold text-gray-900 ${className}`}>
    {children}
  </h3>
);

export const CardDescription = ({ children, className = '' }) => (
  <p className={`text-sm text-gray-600 ${className}`}>
    {children}
  </p>
);

export const CardContent = ({ children, className = '' }) => (
  <div className={className}>
    {children}
  </div>
);

export const CardFooter = ({ children, className = '' }) => (
  <div className={`mt-4 pt-4 border-t border-gray-200 flex gap-2 ${className}`}>
    {children}
  </div>
);
