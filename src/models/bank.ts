import { Schema, model } from 'mongoose';

const bankSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  interestRate: {
    type: Number,
    required: true
  },
  maximumLoan: {
    type: Number,
    required: true
  },
  minimumDownPayment: {
    type: Number,
    required: true
  },
  loanTerm: {
    type: Number,
    required: true
  }
});

export const BankModel = model('Bank', bankSchema);
