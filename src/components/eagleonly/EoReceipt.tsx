import React from 'react';
import { TRANSACTION_FEE } from '../../data/eagleonly';

// Where a member's payment goes, laid out like a scorecard. The green fee is an example amount;
// the lines underneath are the real fee structure (Stripe's standard rate, our flat fee, no percentage).
const EoReceipt: React.FC = () => (
  <div className="eo-receipt" role="group" aria-label="Example breakdown of a member payment">
    <div className="eo-receipt-head">
      <span>Visitor green fee</span>
      <span>Example</span>
    </div>
    <div className="eo-receipt-total">
      <span>Paid into</span>
      <strong>Your club's Stripe account</strong>
    </div>
    <dl className="eo-receipt-lines">
      <div>
        <dt>Card processing</dt>
        <dd>Standard Stripe rate</dd>
      </div>
      <div>
        <dt>EagleOnly fee</dt>
        <dd>{TRANSACTION_FEE} flat</dd>
      </div>
      <div className="eo-receipt-zero">
        <dt>Percentage to EagleOnly</dt>
        <dd>0%</dd>
      </div>
    </dl>
    <div className="eo-receipt-foot">Membership direct debits via GoCardless</div>
  </div>
);

export default EoReceipt;
