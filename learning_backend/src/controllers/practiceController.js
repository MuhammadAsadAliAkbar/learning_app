// Practice tools – journal validation, equation, etc. Heavy calc goes to Python
exports.savePractice = async (req, res, next) => {
  try {
    const User = require('../models/User');
    const user = await User.findById(req.user._id);
    user.practiceHistory.push({
      type: req.body.type,
      data: req.body.data,
      result: req.body.result,
    });
    if (user.practiceHistory.length > 50) user.practiceHistory = user.practiceHistory.slice(-50);
    await user.save();
    res.json({ success: true, message: 'Saved' });
  } catch (e) { next(e); }
};

exports.getHistory = async (req, res, next) => {
  try {
    const User = require('../models/User');
    const user = await User.findById(req.user._id);
    res.json({ success: true, data: user.practiceHistory || [] });
  } catch (e) { next(e); }
};
