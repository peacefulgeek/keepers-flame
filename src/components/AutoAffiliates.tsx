import React from 'react';

interface AutoAffiliatesProps {
  bottomSection: string;
}

export default function AutoAffiliates({ bottomSection }: AutoAffiliatesProps) {
  if (!bottomSection) return null;
  return (
    <div dangerouslySetInnerHTML={{ __html: bottomSection }} />
  );
}
