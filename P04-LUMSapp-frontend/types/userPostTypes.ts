export interface UserPostProps {
    posts: any[];
    postPage: number;
    setPostPage: (page: number) => void;
    setPosts: (posts: any[]) => void;
    getPostData: (page: number) => void;
    postRefresh: boolean;
    setPostRefresh: (refresh: boolean) => void;
}
export interface UserCommentProps {
    commentsWithPosts: any[];
    commentPage: number;
    setCommentPage: (page: number) => void;
    setCommentsWithPosts: (posts: any[]) => void;
    getCommentData: (page: number) => void;
    commentRefresh: boolean;
    setCommentRefresh: (refresh: boolean) => void;
}

export interface UserPostRef {
    scrollTo: (destination: number) => void;
    isActive: () => boolean;
    setPostPropsFunc: (postProps: any) => void;
}
