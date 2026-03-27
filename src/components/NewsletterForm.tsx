import { useState } from 'react';

interface Props {
  source?: string;
}

export function NewsletterForm({ source = 'homepage' }: Props) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source }),
      });
      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="newsletter-banner">
        <h2>Thanks for subscribing!</h2>
        <p>You've joined our community of caregivers. We see you.</p>
      </div>
    );
  }

  return (
    <div className="newsletter-banner">
      <h2>Stay Connected</h2>
      <p>Join our community of caregivers who refuse to disappear.</p>
      <form className="newsletter-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          aria-label="Email address for newsletter"
        />
        <button type="submit">Join Us</button>
      </form>
      {status === 'error' && <p style={{ color: '#A0522D', fontSize: '0.85rem', marginTop: '0.5rem' }}>Something went wrong. Please try again.</p>}
    </div>
  );
}
