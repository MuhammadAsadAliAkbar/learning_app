const Chapter = require('../models/Chapter');
const chaptersData = require('../data/chapters');

exports.getAll = async (req, res, next) => {
  try {
    let chapters = await Chapter.find().sort({ number: 1 }).select('chapterId number title');
    if (chapters.length === 0) {
      // fallback to static data
      chapters = chaptersData.map((c) => ({ chapterId: c.chapterId, number: c.number, title: c.title }));
    }
    res.json({ success: true, data: chapters });
  } catch (e) { next(e); }
};

exports.getOne = async (req, res, next) => {
  try {
    let chapter = await Chapter.findOne({ chapterId: req.params.id });
    if (!chapter) {
      chapter = chaptersData.find((c) => c.chapterId === req.params.id);
    }
    if (!chapter) return res.status(404).json({ success: false, message: 'Chapter not found' });
    res.json({ success: true, data: chapter });
  } catch (e) { next(e); }
};
