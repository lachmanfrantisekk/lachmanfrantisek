import { useId, type InputHTMLAttributes, type TextareaHTMLAttributes } from 'react';

interface BaseFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  multiline?: boolean;
}

type InputFieldProps = BaseFieldProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'label' | 'value' | 'onChange' | 'required'> & {
    multiline?: false;
  };

type TextareaFieldProps = BaseFieldProps &
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'id' | 'label' | 'value' | 'onChange' | 'required'> & {
    multiline: true;
  };

type FieldProps = InputFieldProps | TextareaFieldProps;

export function Field(props: FieldProps) {
  const {
    id,
    label,
    value,
    onChange,
    error,
    required,
    multiline,
    className = '',
    ...rest
  } = props as BaseFieldProps & { className?: string } & Record<string, unknown>;

  const reactId = useId();
  const fieldId = id || reactId;
  const errorId = `${fieldId}-error`;
  const hasValue = value.length > 0;

  const sharedClass = `peer w-full rounded-2xl border bg-white/50 dark:bg-white/[0.03] px-4 text-[15px] text-heading placeholder-transparent transition-all duration-300 focus:outline-none ${
    error
      ? 'border-rose-400/60 focus:border-rose-500'
      : 'border-slate-300/50 dark:border-white/[0.08] focus:border-brand-500 dark:focus:border-brand-400'
  }`;

  return (
    <div className={`relative ${className}`}>
      {multiline ? (
        <textarea
          id={fieldId}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          rows={5}
          placeholder={label}
          className={`${sharedClass} pt-6 pb-3 resize-none`}
          {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          id={fieldId}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          placeholder={label}
          className={`${sharedClass} h-14 pt-5`}
          {...(rest as InputHTMLAttributes<HTMLInputElement>)}
        />
      )}

      <label
        htmlFor={fieldId}
        className={`pointer-events-none absolute left-4 origin-left transition-all duration-200 ${
          multiline ? 'top-4' : 'top-1/2 -translate-y-1/2'
        } ${
          hasValue || multiline
            ? 'top-3 translate-y-0 text-[11px] font-medium text-slate-500 dark:text-slate-400'
            : 'text-[15px] text-slate-400 dark:text-slate-500'
        } peer-focus:top-3 peer-focus:translate-y-0 peer-focus:text-[11px] peer-focus:font-medium peer-focus:text-brand-600 dark:peer-focus:text-brand-400`}
      >
        {label}
      </label>

      {error && (
        <p id={errorId} className="mt-1.5 px-1 text-xs text-rose-600 dark:text-rose-400">
          {error}
        </p>
      )}
    </div>
  );
}
