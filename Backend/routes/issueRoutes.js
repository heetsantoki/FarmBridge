const express = require('express');
const router = express.Router();
const Issue = require('../models/Issue');

// 1. Submit a new Help Request / Issue (Farmer or Buyer)
router.post('/', async (req, res) => {
  try {
    const {
      userType,
      name,
      farmerName,
      buyerName,
      address,
      contactNo,
      email,
      issueDescription,
      productIssue,
      photo,
      date,
    } = req.body;

    const resolvedName = name || farmerName || buyerName;
    const resolvedDescription = issueDescription || productIssue;

    if (!resolvedName || !contactNo || !resolvedDescription) {
      return res.status(400).json({ message: 'Name, contact number, and description are required' });
    }

    const newIssue = new Issue({
      userType: userType === 'buyer' ? 'buyer' : 'farmer',
      name: resolvedName,
      address: address || '',
      contactNo,
      email: email || '',
      issueDescription: resolvedDescription,
      photo: photo || null,
      date: date ? new Date(date) : new Date(),
      status: 'pending',
    });

    await newIssue.save();
    res.status(201).json({
      message: 'Help request submitted successfully',
      issue: newIssue,
    });
  } catch (error) {
    console.error('Error creating issue:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
});

// 2. Get all Issues (with optional filter ?userType=farmer|buyer)
router.get('/', async (req, res) => {
  try {
    const { userType, status } = req.query;
    const query = {};
    if (userType) query.userType = userType;
    if (status) query.status = status;

    const issues = await Issue.find(query).sort({ createdAt: -1 });

    // Format for frontend compatibility
    const formatted = issues.map((doc) => ({
      id: doc._id.toString(),
      _id: doc._id.toString(),
      userType: doc.userType,
      name: doc.name,
      farmerName: doc.userType === 'farmer' ? doc.name : undefined,
      buyerName: doc.userType === 'buyer' ? doc.name : undefined,
      address: doc.address,
      contactNo: doc.contactNo,
      email: doc.email,
      issueDescription: doc.issueDescription,
      productIssue: doc.issueDescription,
      date: doc.date ? doc.date.toISOString() : doc.createdAt.toISOString(),
      photo: doc.photo,
      status: doc.status,
      createdAt: doc.createdAt,
    }));

    res.status(200).json(formatted);
  } catch (error) {
    console.error('Error fetching issues:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
});

// 3. Update Issue Status (e.g. resolve)
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const issue = await Issue.findById(id);
    if (!issue) {
      return res.status(404).json({ message: 'Issue not found' });
    }

    if (status) issue.status = status;
    await issue.save();

    res.status(200).json({
      message: `Issue marked as ${issue.status}`,
      issue,
    });
  } catch (error) {
    console.error('Error updating issue:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
});

// 4. Delete an Issue
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Issue.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Issue not found' });
    }

    res.status(200).json({ message: 'Issue deleted successfully' });
  } catch (error) {
    console.error('Error deleting issue:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
});

module.exports = router;
