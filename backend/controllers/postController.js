const Post = require('../models/postModel');

const APIFeatures = require('../utils/apiFeatures');
const multer = require('multer');
const sharp = require('sharp');

// exports.aliasTopTours = (req, res, next) => {
//   req.query.limit = '5';
//   req.query.sort = '-ratingsAverage,price';
//   req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
//   next();
// };

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image! Please upload only images.'), false);
  }
};
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});
exports.uploadPostImages = upload.array('images', 3);

exports.resizePostImages = (req, res, next) => {
  if (!req.files) return next();

  req.files.forEach((file) => {
    file.filename = `post-${req.user.id}-${Date.now()}-${file.originalname}`;
    sharp(file.buffer)
      .resize(500, 500)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`public/img/posts/${file.filename}`);
  });

  next();
};

exports.getAllPosts = async (req, res) => {
  try {
    // EXECUTE QUERY
    const features = new APIFeatures(Post.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const posts = await features.query;

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: posts.length,
      data: {
        posts,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
      error: 'erore',
    });
  }
};

exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // Post.findOne({ _id: req.params.id })

    res.status(200).json({
      status: 'success',
      data: {
        post,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createPost = async (req, res) => {
  try {
    console.log('body', req.body);
    console.log('file', req.files);
    // const newTour = new Post({})
    // await newTour.save()

    // const newPost = await Post.create(req.body);

    // Get the user from the request
    const user = req.user;

    // Create the new post with the createdBy field set to the user's ID
    const newPost = await Post.create({
      ...req.body,
      createdBy: user._id,
      images: req.files.map((file) => file.filename),
    });

    // Add the new post to the user's posts array
    user.posts.push(newPost._id);

    res.status(201).json({
      status: 'success',
      data: {
        Post: newPost,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        post,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({
        status: 'fail',
        message: 'No post found with that ID',
      });
    }
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

// exports.getTourStats = async (req, res) => {
//   try {
//     const stats = await Post.aggregate([
//       {
//         $match: { ratingsAverage: { $gte: 4.5 } }
//       },
//       {
//         $group: {
//           _id: { $toUpper: '$difficulty' },
//           numTours: { $sum: 1 },
//           numRatings: { $sum: '$ratingsQuantity' },
//           avgRating: { $avg: '$ratingsAverage' },
//           avgPrice: { $avg: '$price' },
//           minPrice: { $min: '$price' },
//           maxPrice: { $max: '$price' }
//         }
//       },
//       {
//         $sort: { avgPrice: 1 }
//       }
//       // {
//       //   $match: { _id: { $ne: 'EASY' } }
//       // }
//     ]);

//     res.status(200).json({
//       status: 'success',
//       data: {
//         stats
//       }
//     });
//   } catch (err) {
//     res.status(404).json({
//       status: 'fail',
//       message: err
//     });
//   }
// };

// exports.getMonthlyPlan = async (req, res) => {
//   try {
//     const year = req.params.year * 1; // 2021

//     const plan = await Post.aggregate([
//       {
//         $unwind: '$startDates'
//       },
//       {
//         $match: {
//           startDates: {
//             $gte: new Date(`${year}-01-01`),
//             $lte: new Date(`${year}-12-31`)
//           }
//         }
//       },
//       {
//         $group: {
//           _id: { $month: '$startDates' },
//           numTourStarts: { $sum: 1 },
//           tours: { $push: '$name' }
//         }
//       },
//       {
//         $addFields: { month: '$_id' }
//       },
//       {
//         $project: {
//           _id: 0
//         }
//       },
//       {
//         $sort: { numTourStarts: -1 }
//       },
//       {
//         $limit: 12
//       }
//     ]);

//     res.status(200).json({
//       status: 'success',
//       data: {
//         plan
//       }
//     });
//   } catch (err) {
//     res.status(404).json({
//       status: 'fail',
//       message: err
//     });
//   }
// };
