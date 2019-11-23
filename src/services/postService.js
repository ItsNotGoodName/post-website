class PostService{
    constructor() {
        this.posts = []
    }
    addPost(title, body){
        this.posts.push({title: title, body: body});
    }

    getPosts(){
        return this.posts;
    }
}

module.exports = PostService;