import * as postService from '../services/post.service.js'

export const getAllPosts = async (req, res) => {
    try {
        const posts = await postService.getAllPosts();

        return res.status(200).json({
            message: 'Posts fetched successfully',
            data: posts
        });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

export const getPostById = async (req, res) => {
    try {
        const post = await postService.getPostById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        return res.status(200).json({
            message: 'Post fetched successfully',
            data: post
        });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(422).json({ message: 'Title and content are required' });
    }

    try {
        const post = await postService.createPost(req.user.id, req.body);

        return res.status(201).json({
            message: 'Post created successfully',
            data: {
                id: post.id,
                title: post.title,
                content: post.content,
                userId: post.userId
            }
        });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(422).json({ message: 'Title and content are required' });
    }

    try {
        const post = await postService.getPostById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        await postService.updatePost(req.user.id, req.params.id, req.body);

        return res.status(201).json({
            message: 'Post updated successfully',
            data: {
                id: post.id,
                title: post.title,
                content: post.content,
                userId: post.userId
            }
        });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

export const deletePost = async (req, res) => {
    try {
        const post = await postService.getPostById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        await postService.deletePost(req.params.id);

        return res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

