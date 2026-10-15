import { Link } from 'react-router';
import Portal from '../components/Portal';

const NotFoundPage = () => (
  <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 py-8 text-center">
    <Portal className="size-[min(320px,80vw)]" />
    <h1 className="text-[clamp(4rem,14vw,7.5rem)] leading-none text-green-lime text-shadow-lg text-shadow-green-lime/60">
      404
    </h1>
    <p>This dimension doesn&apos;t exist</p>
    <Link
      to="/"
      className="rounded-xl bg-green-lime px-3 text-3xl transition duration-500 hover:bg-portal"
    >
      Back to home
    </Link>
  </main>
);

export default NotFoundPage;
