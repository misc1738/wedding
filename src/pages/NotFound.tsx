import { Link } from 'react-router-dom';
import Wreath from '../components/art/Wreath';

export default function NotFound() {
  return (
    <main className="flex min-h-[100svh] flex-col items-center justify-center bg-field px-6 text-center text-cream">
      <Wreath className="h-auto w-[min(80vw,26rem)] opacity-90" />

      <div className="-mt-24 relative z-10">
        <p className="eyebrow text-gold-light/80">Page not found</p>
        <h1 className="mt-4 font-script text-[clamp(2.4rem,8vw,4rem)] text-cream">
          This isn’t where you meant to go
        </h1>
        <p className="mt-4 max-w-md text-cream/70">
          The wedding, however, is exactly where you think it is.
        </p>
        <Link to="/" className="btn-gold btn-gold--solid mt-8">
          Back to the invitation
        </Link>
      </div>
    </main>
  );
}
