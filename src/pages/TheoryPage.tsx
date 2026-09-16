import React from 'react';
import { Page } from '../components/common/Page';
import { TheoryAccordion } from '../components/theory/TheoryAccordion';

export const TheoryPage: React.FC = () => {
  return (
    <Page>
      <div className="py-4">
        <TheoryAccordion />
      </div>
    </Page>
  );
};
