"use client";

import { Send } from "lucide-react";
import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/Button";

interface FormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type FormErrors = Partial<Record<keyof FormValues, string>>;

const initialValues: FormValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

interface FormField {
  id: Exclude<keyof FormValues, "message">;
  label: string;
  type?: string;
  fullWidth?: boolean;
}

const formFields: FormField[] = [
  { id: "name", label: "Name" },
  { id: "email", label: "Email", type: "email" },
  { id: "subject", label: "Subject", fullWidth: true },
];

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (!values.email.trim()) {
    errors.email = "Please enter your email.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!values.subject.trim()) errors.subject = "Please enter a subject.";
  if (!values.message.trim()) errors.message = "Please enter a message.";
  return errors;
}

export function ContactForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [notice, setNotice] = useState("");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setNotice("");
      return;
    }

    setNotice(
      "Form submission is not connected to a backend yet. Your message has not been sent.",
    );
  }

  function updateValue(field: keyof FormValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  return (
    <form className="grid gap-5" noValidate onSubmit={onSubmit}>
      <div className="grid gap-5 sm:grid-cols-2">
        {formFields.map((field) => (
          <div
            className={field.fullWidth ? "sm:col-span-2" : undefined}
            key={field.id}
          >
            <label className="text-sm font-semibold" htmlFor={field.id}>
              {field.label}
            </label>
            <input
              aria-describedby={
                errors[field.id] ? `${field.id}-error` : undefined
              }
              aria-invalid={Boolean(errors[field.id])}
              className="mt-2 min-h-12 w-full rounded-xl border border-[var(--border-strong)] bg-[var(--background)] px-4 text-sm text-[var(--foreground)] transition outline-none placeholder:text-[var(--muted-foreground)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-soft)]"
              id={field.id}
              name={field.id}
              onChange={(event) => updateValue(field.id, event.target.value)}
              type={field.type ?? "text"}
              value={values[field.id]}
            />
            {errors[field.id] ? (
              <p
                className="mt-2 text-sm text-red-600 dark:text-red-400"
                id={`${field.id}-error`}
              >
                {errors[field.id]}
              </p>
            ) : null}
          </div>
        ))}
      </div>
      <div>
        <label className="text-sm font-semibold" htmlFor="message">
          Message
        </label>
        <textarea
          aria-describedby={errors.message ? "message-error" : undefined}
          aria-invalid={Boolean(errors.message)}
          className="mt-2 min-h-36 w-full resize-y rounded-xl border border-[var(--border-strong)] bg-[var(--background)] px-4 py-3 text-sm text-[var(--foreground)] transition outline-none placeholder:text-[var(--muted-foreground)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-soft)]"
          id="message"
          name="message"
          onChange={(event) => updateValue("message", event.target.value)}
          value={values.message}
        />
        {errors.message ? (
          <p
            className="mt-2 text-sm text-red-600 dark:text-red-400"
            id="message-error"
          >
            {errors.message}
          </p>
        ) : null}
      </div>
      {notice ? (
        <p
          className="rounded-xl border border-[var(--accent)] bg-[var(--accent-soft)] p-4 text-sm text-[var(--foreground)]"
          role="status"
        >
          {notice}
        </p>
      ) : null}
      <div>
        <Button type="submit">
          Validate Message
          <Send aria-hidden="true" size={16} strokeWidth={1.8} />
        </Button>
      </div>
    </form>
  );
}
