import express from 'express';
import { Document } from 'mongoose';
import { BankModel } from '../models/bank';
import { MortgageModel } from '../models/mortgage';

const router = express.Router();

//Input date with validation. Calculate monthly mortgage payment
router.post('/', async (req, res) => {
  let bank: Document<any> | null = null;

  try {
    bank = await BankModel.findById(req.body.bank);

    // General validation
    await MortgageModel.validate(req.body);
    const bankExists = await BankModel.exists(req.body.bank);

    // Check if bank exists
    if (!bankExists) {
      throw new Error('Wrong bank id!');
    }

    if (req.body.initialLoan && req.body.downPayment) {
      if (req.body.initialLoan <= bank?.get('maximumLoan') && req.body.downPayment >= bank?.get('minimumDownPayment')) {
        console.log('Calculation monthly mortgage payment...');
      } else {
        console.log('ERROR: Validation data');
        throw new Error('The entered data is not valid for the selected bank!');
      }
    }
  } catch (err) {
    res.status(400).send(err.message ?? 'Bad Request');
    return;
  }

  const mortgage = new MortgageModel(req.body);

  try {
    // TODO: calculate the mortgage and send to the client
    const rate = bank?.get('interestRate') / 100 / 12;
    const mortgageResult =
      (req.body.initialLoan * rate * Math.pow(1 + rate, bank?.get('loanTerm'))) /
      (Math.pow(1 + rate, bank?.get('loanTerm')) - 1);

    console.log(mortgageResult);

    mortgage.set('monthlyMortgagePayment', mortgageResult);
    await mortgage.save();

    res.status(200).json(mortgageResult);
  } catch (err) {
    res.status(500).send(err.message ?? 'Internal Server Error');
  }
});

router.get('/history', async (req, res) => {
  try {
    const mortgageList = await MortgageModel.find().populate('bank').exec();
    res.status(200).json(mortgageList);
  } catch (err) {
    res.status(500).send(err.message ?? 'Internal Server Error');
  }
});

export { router };
