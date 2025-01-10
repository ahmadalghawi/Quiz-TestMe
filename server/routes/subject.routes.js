import express from 'express';
import { PrismaClient } from '@prisma/client';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();
const prisma = new PrismaClient();

// @route   GET /api/subjects
// @desc    Get all subjects
router.get('/', protect, async (req, res) => {
  try {
    const subjects = await prisma.subject.findMany({
      include: {
        topics: {
          include: {
            questions: true,
          },
        },
      },
    });

    res.json({
      status: 'success',
      data: { subjects },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Server error',
    });
  }
});

// @route   POST /api/subjects
// @desc    Create a new subject (Admin only)
router.post('/', protect, authorize('admin'), async (req, res) => {
  try {
    const { name, nameAr, imageUrl } = req.body;

    const subject = await prisma.subject.create({
      data: {
        name,
        nameAr,
        imageUrl,
      },
    });

    res.status(201).json({
      status: 'success',
      data: { subject },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Server error',
    });
  }
});

// @route   PUT /api/subjects/:id
// @desc    Update a subject (Admin only)
router.put('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { name, nameAr, imageUrl } = req.body;

    const subject = await prisma.subject.update({
      where: { id },
      data: {
        name,
        nameAr,
        imageUrl,
      },
    });

    res.json({
      status: 'success',
      data: { subject },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Server error',
    });
  }
});

// @route   DELETE /api/subjects/:id
// @desc    Delete a subject (Admin only)
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    await prisma.subject.delete({
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