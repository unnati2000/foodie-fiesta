let { buildSchema } = require("graphql");

const schema = buildSchema(`
  type Post {
    _id: ID!
    title: String!
    steps: [String!]!
    photo: String
    postedBy: ID!
    comment:[Comment]
   likes: [Like]!
  }

  type Like {
    id: ID!
  }

  type Comment {
    text: String!
    postedBy: ID!
  }
  
  type User {
    _id: ID!
    name: String!
    email: String!
    password: String
    channelname:String!
    pic:String
    followers:[Followers]
    following:[Following]
  }

  type Followers {
    id: ID!
  }
  type Following {
    id: ID!
  }

  type AuthData {
    userId: ID!
    token: String!
    }

    input UserInput {
        name: String!
        email: String!
        password: String!
        channelname: String!
    }

    input PostInput {
        title: String!
        steps: [String]!
        photo: String
    }

    input CommentInput {
      text: String!,
      username: String!
    }
    
    type RootQuery {
        me: User!
        myposts: [Post!]!
        posts: [Post!]!
        post(postId: ID!): Post
        login(email: String!, password: String!): AuthData!
    }

    type RootMutation {
        createUser(userInput: UserInput): User
        createPost(postInput: PostInput): Post!
        addComment(postId:ID!, comment: CommentInput!): Post!
        likePost(postId: ID!): Post!
        deletePost(postId: ID!): ID!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    } 
`);

module.exports = schema;
