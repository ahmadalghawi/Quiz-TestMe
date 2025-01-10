import express from 'express';
import { PrismaClient } from '@prisma/client';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();
const prisma = new PrismaClient();

// @route   GET /api/questions/:topicId
// @desc    Get questions by topic
router.get('/:topicId', protect, async (req, res) => {
  try {
    const topicId = parseInt(req.params.topicId, 10);

    const questions = await prisma.question.findMany({
      where: { topicId },
    });

    res.json({
      status: 'success',
      data: { questions },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Server error',
    });
  }
});

// @route   POST /api/questions
// @desc    Create a new question (Admin only)
router.post('/', protect, authorize('admin'), async (req, res) => {
  console.log(req.body);
  try {
    const { text, textAr, difficulty, options, correctOptionId, topicId } = req.body;

    const question = await prisma.question.create({
      data: {
        text,
        textAr,
        difficulty,
        options,
        correctOptionId,
        topicId: parseInt(topicId, 10),
      },
    });

    res.status(201).json({
      status: 'success',
      data: { question },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Server error',
    });
  }
});

// @route   PUT /api/questions/:id
// @desc    Update a question (Admin only)
router.put('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { text, textAr, difficulty, options, correctOptionId } = req.body;

    const question = await prisma.question.update({
      where: { id },
      data: {
        text,
        textAr,
        difficulty,
        options,
        correctOptionId,
      },
    });

    res.json({
      status: 'success',
      data: { question },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Server error',
    });
  }
});

// @route   DELETE /api/questions/:id
// @desc    Delete a question (Admin only)
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    await prisma.question.delete({
      where: { id },
    });

    res.json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Server error',
    });
  }
});

export default router;