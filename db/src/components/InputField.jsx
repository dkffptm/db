const InputField = ({ label, type, name, value, onChange, placeholder, className = "" }) => (
  <div className="mb-4">
    <label className="block text-sm mb-1 font-medium">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full p-2 border rounded-lg focus:outline-blue-500 text-black ${className}`}
      required
    />
  </div>
);

export default InputField;
