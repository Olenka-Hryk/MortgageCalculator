import { Schema, model } from 'mongoose';

const mortgageSchema = new Schema({
  bank: {
    type: Schema.Types.ObjectId,
    ref: 'Bank',
    required: true
  },
  initialLoan: {
    type: Number,
    required: true
  },
  downPayment: {
    type: Number,
    required: true
  },
  monthlyMortgagePayment: Number
});

export const MortgageModel = model('Mortgage', mortgageSchema);
