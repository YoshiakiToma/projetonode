const mongoose = require('mongoose');
const Post = mongoose.model('Post');
const slug = require('slug');

exports.add = (req, res) => {
    res.render('postAdd');
};

exports.addAction = async (req, res) => {
    
    req.body.tags = req.body.tags.split(",");
    req.body.tags = req.body.tags.map(tags => tags.trim());

    const post = new Post(req.body);
    try {
        await post.save();
    } catch (error) {
        req.flash('error', 'Erro: ' + error.message);
        return res.redirect('/post/add');
    }
    
    //res.json(req.body);

    req.flash('success', 'Post salvo com sucesso!');

    res.redirect("/");
    
};

exports.edit = async (req, res) => {
    // 1. Pegar as informações do post em questão.
    const post = await Post.findOne({ slug: req.params.slug});
    post.tags = post.tags.join(",")
    // 2. Carregar o formulário de edição.
    res.render('postEdit', { post });
};

exports.editAction = async (req, res) => {
    // Procurar o item enviado.
    req.body.slug = slug(req.body.title, { lower: true });
    req.body.tags = req.body.tags.split(",");
    req.body.tags = req.body.tags.map(tags => tags.trim());
    try {
        const post = await Post.findOneAndUpdate( 
            { slug: req.params.slug }, 
            req.body, 
            {
                new: true, // Uma vez feita vai retornar um novo post
                runValidators: true
            }
        );
    } catch (error) {
        req.flash('error', 'Erro: ' + error.message);
        return res.redirect('/post/' + req.params.slug + '/edit');
    }
    req.flash('success', 'Post atualizaod com sucesso');

    res.redirect('/');
};

exports.view = async (req, res) => {
      // 1. Pegar as informações do post em questão.
    const post = await Post.findOne({ slug: req.params.slug});
    post.tags = post.tags.join(",")
    // 2. Carregar o formulário de edição.

    res.render('view', { post });
};