import Portal from './Portal';

const Loader = () => (
  <div role="status" className="flex flex-col items-center gap-6 py-8">
    <Portal className="size-[min(32rem,85vw)]" />
    <span>Loading...</span>
  </div>
);

export default Loader;
