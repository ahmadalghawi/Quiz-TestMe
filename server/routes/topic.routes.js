import express from 'express';
import { PrismaClient } from '@prisma/client';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();
const prisma = new PrismaClient();

// @route   GET /api/topics/:subjectId
// @desc    Get topics by subject
router.get('/:subjectId', protect, async (req, res) => {
  try {
    const subjectId = parseInt(req.params.subjectId, 10);

    const topics = await prisma.topic.findMany({
      where: { subjectId },
      include: {
        questions: true,
      },
    });

    res.json({
      status: 'success',
      data: { topics },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Server error',
    });
  }
});

// @route   POST /api/topics
// @desc    Create a new topic (Admin only)
router.post('/', protect, authorize('admin'), async (req, res) => {
  try {
    const { name, nameAr, quizTime, subjectId } = req.body;

    const topic = await prisma.topic.create({
      data: {
        name,
        nameAr,
        quizTime: parseInt(quizTime, 10),
        subjectId: parseInt(subjectId, 10),
      },
    });

    res.status(201).json({
      status: 'success',
      data: { topic },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Server error',
    });
  }
});

// @route   PUT /api/topics/:id
// @desc    Update a topic (Admin only)
router.put('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { name, nameAr } = req.body;
    const quizTime = parseInt(req.body.quizTime, 10);
    
    const topic = await prisma.topic.update({
      where: { id },
      data: {
        name,
        nameAr,
        quizTime,
      },
    });

    res.json({
      status: 'success',
      data: { topic },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'error',
      message: 'Server error',
    });
  }
});

// @route   DELETE /api/topics/:id
// @desc    Delete a topic (Admin only)
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    await prisma.topic.delete({
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