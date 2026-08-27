import { useState, type FormEvent } from 'react';
import { AlertCircle, CheckCircle2, Loader2, Send } from 'lucide-react';
import { loadMessages, saveMessages, genId } from '@/lib/storage';
import type { ContactFormValues, ContactMessage } from '@/types';
import { useLanguage } from '@/i18n/LanguageContext';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { Field } from '@/components/ui/Field';

const empty: ContactFormValues = {
  name: '',
  email: '',
  subject: '',
  company: '',
  website: '',
  budget: '',
  message: '',
};

type Errors = Partial<Record<keyof ContactFormValues, string>>;
type Phase = 'idle' | 'sending' | 'success' | 'error';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Contact() {
  const { t } = useLanguage();
  const [values, setValues] = useState<ContactFormValues>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [phase, setPhase] = useState<Phase>('idle');
  const [honeypot, setHoneypot] = useState('');

  const v = t.contact.validation;

  const set = (key: keyof ContactFormValues) => (value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = (): boolean => {
    const next: Errors = {};
    if (!values.name.trim()) next.name = v.nameRequired;
    if (!values.email.trim()) next.email = v.emailRequired;
    else if (!EMAIL_RE.test(values.email.trim())) next.email = v.emailInvalid;
    if (!values.message.trim()) next.message = v.messageRequired;
    else if (values.message.trim().length < 10) next.message = v.messageShort;
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (phase === 'sending') return;
    if (!validate()) return;

    if (honeypot.trim()) {
      setPhase('success');
      setValues(empty);
      return;
    }

    setPhase('sending');

    const msg: ContactMessage = {
      id: genId(),
      name: values.name.trim(),
      email: values.email.trim(),
      subject: values.subject.trim(),
      company: values.company.trim(),
      website: values.website.trim(),
      budget: values.budget.trim(),
      message: values.message.trim(),
      status: 'new',
      created_at: new Date().toISOString(),
    };

    const messages = loadMessages();
    messages.push(msg);
    saveMessages(messages);

    setPhase('success');
    setValues(empty);
    setErrors({});
  };

  return (
    <section id="contact" className="relative scroll-mt-24 py-24 sm:py-28">
      <div className="container-page">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow={t.contact.eyebrow}
              title={t.contact.title}
              subtitle={t.contact.subtitle}
            />
          </div>

          <Reveal className="relative">
            <div className="rounded-3xl glass p-6 sm:p-8">
              {phase === 'success' ? (
                <div className="flex min-h-[22rem] flex-col items-center justify-center text-center">
                  <div className="flex h-16 w-16 animate-check-pop items-center justify-center rounded-full bg-emerald-500/15 text-emerald-500">
                    <CheckCircle2 className="h-9 w-9" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-heading">{t.contact.successTitle}</h3>
                  <p className="mt-2 max-w-sm text-slate-600 dark:text-slate-400">
                    {t.contact.successBody}
                  </p>
                  <Button variant="secondary" className="mt-6" onClick={() => setPhase('idle')}>
                    {t.contact.sendAnother}
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field
                      id="name"
                      label={t.contact.name}
                      value={values.name}
                      onChange={set('name')}
                      error={errors.name}
                      required
                      autoComplete="name"
                    />
                    <Field
                      id="email"
                      type="email"
                      label={t.contact.email}
                      value={values.email}
                      onChange={set('email')}
                      error={errors.email}
                      required
                      autoComplete="email"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field
                      id="subject"
                      label={`${t.contact.subject} (${t.contact.optional})`}
                      value={values.subject}
                      onChange={set('subject')}
                    />
                    <Field
                      id="budget"
                      label={`${t.contact.budget} (${t.contact.optional})`}
                      value={values.budget}
                      onChange={set('budget')}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field
                      id="company"
                      label={`${t.contact.company} (${t.contact.optional})`}
                      value={values.company}
                      onChange={set('company')}
                      autoComplete="organization"
                    />
                    <Field
                      id="website"
                      label={`${t.contact.website} (${t.contact.optional})`}
                      value={values.website}
                      onChange={set('website')}
                    />
                  </div>

                  <Field
                    id="message"
                    label={t.contact.message}
                    value={values.message}
                    onChange={set('message')}
                    error={errors.message}
                    required
                    multiline
                  />

                  <div className="absolute left-[-9999px]" aria-hidden>
                    <label>
                      Do not fill this field
                      <input
                        tabIndex={-1}
                        autoComplete="off"
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                      />
                    </label>
                  </div>

                  {phase === 'error' && (
                    <div className="flex items-start gap-3 rounded-2xl bg-rose-500/10 p-4 text-sm text-rose-600 dark:text-rose-400">
                      <AlertCircle className="mt-0.5 h-5 w-5 flex-none" />
                      <div>
                        <p className="font-semibold">{t.contact.errorTitle}</p>
                        <p className="mt-0.5">{t.contact.errorBody}</p>
                      </div>
                    </div>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={phase === 'sending'}
                  >
                    {phase === 'sending' ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        {t.contact.sending}
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        {t.contact.send}
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
