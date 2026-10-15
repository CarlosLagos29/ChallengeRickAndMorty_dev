import type { ReactNode } from 'react';

interface StatusMessageProps {
  children: ReactNode;
}

const StatusMessage = ({ children }: StatusMessageProps) => (
  <p className="col-span-full mt-10 text-center">{children}</p>
);

export default StatusMessage;
