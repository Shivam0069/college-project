export const Textarea = ({
  placeholder = '',
  value,
  onChange,
  className = '',
  label = '',
  error = '',
  rows = 4,
  disabled = false,
  required = false,
  ...props
}) => {
  const baseStyles = 'w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed resize-none font-sans';

  const errorStyles = error ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : '';

  const combinedClassName = `${baseStyles} ${errorStyles} ${className}`;

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={rows}
        disabled={disabled}
        className={combinedClassName}
        {...props}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};
