const Post = require('../models/post');

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('user');
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('user');
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.createPost = async (req, res) => {
  try {
    const post = new Post({
      ...req.body,
      user: req.user.id,
    });

    await post.save();

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
