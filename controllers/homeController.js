const mongoose = require('mongoose');
const Post = mongoose.model('Post');

exports.userMiddleware = (req, res, next) => {
    let info = { name: 'Thiago', id: 12 };
    req.userInfo = info;
    next();
};

exports.index = async (req, res) => {
    let oResponseJson = {
        pageTitle: 'Titulo de teste',
        posts: []
    }

    const posts = await Post.find();
    oResponseJson.posts = posts;

    res.render('home', oResponseJson);
}