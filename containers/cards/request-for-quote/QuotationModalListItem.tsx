import React, { PropsWithChildren } from 'react';
import Typography from '@/components/Typography';

const QuotationModalListItem = ({
  label,
  children,
}: PropsWithChildren<{ label: string }>) => (
  <div className="flex items-center justify-between px-4 py-4 last:pb-0 border-b last:border-b-0 border-b-gray-200">
    <Typography kind="h2">{label}</Typography>
    <div>{children}</div>
  </div>
);

export default QuotationModalListItem;
