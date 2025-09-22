import { Input } from './index';

export default function AuthFormField({
  label,
  icon,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  error,
  disabled = false,
  className = ""
}) {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-semibold text-gray-700">
        {icon && <span className="mr-2">{icon}</span>}
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <span className="text-gray-500 text-lg">{icon}</span>
          </div>
        )}
        <Input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className={`${icon ? 'pl-12' : 'pl-4'} h-14 bg-white/70 backdrop-blur-sm border-2 rounded-xl text-gray-800 placeholder-gray-500 transition-all duration-300 ${
            error 
              ? 'border-red-400/70 focus:border-red-500 focus:ring-red-500/20' 
              : 'border-gray-300/70 focus:border-purple-500 focus:ring-purple-500/20 hover:border-gray-400/70'
          } ${className}`}
          placeholder={placeholder}
          disabled={disabled}
        />
      </div>
      {error && (
        <p className="text-red-500 text-sm flex items-center gap-1 mt-2">
          <span>⚠️</span>
          {error}
        </p>
      )}
    </div>
  );
}