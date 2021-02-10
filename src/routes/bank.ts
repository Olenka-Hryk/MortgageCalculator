import express from 'express';
import { BankModel } from '../models/bank';
import { MortgageModel } from '../models/mortgage';

const router = express.Router();

// Get all banks
router.get('/all', async (req, res) => {
  try {
    const banks = await BankModel.find();
    res.status(200).json(banks);
  } catch (err) {
    res.status(500).json(err.message ?? 'Internal Server Error');
  }
});

// Get bank by id
router.get('/:id', async (req, res) => {
  try {
    console.log(req.params.bankId);
    const bank = await BankModel.findById(req.params.id);
    res.status(200).json(bank);
  } catch (err) {
    res.status(500).json(err.message ?? 'Internal Server Error');
  }
});

// Delete bank by id
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;

    const exists = await MortgageModel.exists({ bank: id });

    if (exists) {
      return res.status(400).json('Bad Request');
    }

    const deleted = await BankModel.findByIdAndDelete(req.params.id);
    res.status(200).json(deleted);
  } catch (err) {
    res.status(500).json(err.message ?? 'Internal Server Error');
  }
});

// Update bank by id
router.patch('/:id', async (req, res) => {
  try {
    const updated = await BankModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json(err.message ?? 'Internal Server Error');
  }
});

// Create new bank
router.post('/', async (req, res) => {
  try {
    await BankModel.validate(req.body);
  } catch (err) {
    res.status(400).send(err.message ?? 'Bad Request');
    return;
  }

  const bank = new BankModel(req.body);

  try {
    const created = await bank.save();
    res.status(200).json(created);
  } catch (err) {
    res.status(500).json(err.message ?? 'Internal Server Error');
  }
});

export { router };
