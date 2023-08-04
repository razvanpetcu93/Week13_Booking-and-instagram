class User {
    constructor(username, password) {
        this.username = username; 
        this.password = password;
        this.posts = [];
        this.stories = [];
        this.followers = [];
        this.following = [];
        this.hashtags = [];
        this.locations = [];
        this.directMessages = [];
        this.notifications = [];
    }
}

 createPost(post) {
    this.posts.push(post);
}

 deletePost(postId) {
    this.posts = this.posts.filter((post) => post.id !== postId);
}

 createStory(story) {
    this.stories.push(story);
}

deleteStory (storyId) {
    this.sotries = this.stories.filter((story) => story.id !== storyId);
}

likePost(postId) {
    const post = this.posts.find((post) => post.id === postId);
    is (post) {
        post.like();
    }
}

commentOnPost(postId, comment) {
    const post = this.posts.find((post) => post.id === postId);
    if (post) {
        post.addComment(comment);
    }
}

followUser(user) {
    this.following.push(user);
    user.followers.push(this);
}

unfollowUser(user) {
    this.following = this.following.filter((u) => u !== user);
    user.followers = user.followers.filter((follower) => follower !== this);
}

followHashtag(hashtag) {
    this.hashtags.push(hashtag);
    hashtag.addFollower(this);
}

unfollowHashtag(hashtag) {
    this.hashtags = this.hashtags.filter((ht) => ht !== hashtag);
    hashtag.removeFollower(this);
}

followLocation(location){
    this.locations.push(location);
    location.addFollower(this);
}

unfollowLocation(location) {
    this.locations = this.locations.filter((loc) => loc !== location);
    location.removeFollower(this);
}

sendMessage(sender,recipient, text) {
    const message = new DirectMessage(sender, recipient, text);
    this.directMessages.push(message);
    recipient.directMessages.push(message);
}

getConversation(user1, user2) {
    return this.directMessages.filter((message) => (message.sender === user1 && message.recipient === user2) || (message.sender === user2 && message.recipient === user1));
  }

  triggerNotification(sender, message) {
    const notification = new Notification(sender, message);
    this.notifications.push(notification);
  }


  //post class

  class Post{
    constructor(id, imageUrl, caption, author){
        this.id = id;
        this.imageUrl = imageUrl;
        this.caption = caption;
        this.likes = 0;
        this.comments = [];
        this.author = author;
    }
    addComment(comment) {
        this.comments.push(comment);
    }

    like() {
        this.likes++;
    }
  }

  //comment class

  class Comment {
    constructor(id, text, author) {
        this.id = id;
        this.text = text;
        this.author = author;
    }
  }

  //story class

  class Story {
    constructor(id, imageUrl, duration, author) {
        this.id = id;
        this.imageUrl = imageUrl;
        this.duration = duration;
        this.author = author;
    }
    view(){
        console.log(`Story with ID ${this.id} viewed`);
    }
  }

  //userStory class

  class userStory extends Story {
    constructor(id, imageUrl, duration, author){
        super(id, imageUrl, duration, author);
        this.viewers=[];
        }
        addViewer(user) {
            this.viewers.push(user);
        }

        removeViewer(user) {
            this.viewers = this.viewers.filter((viewer) => viewer !== user);
        }
  }

  //hashtag class

  class Hashtag {
    constructor(name) {
        this.name = name;
        this.posts = [];
        this.followers = [];
    }

    addPost(post) {
        this.posts.push(post);
      }
    
      removePost(postId) {
        this.posts = this.posts.filter((post) => post.id !== postId);
      }
    
      addFollower(user) {
        this.followers.push(user);
      }
    
      removeFollower(user) {
        this.followers = this.followers.filter((follower) => follower !== user);
      }
  }

  // location class

  class Location {
    constructor(name) {
        this.name = name;
        this.posts = [];
        this.followers = [];
    }

    addPost(post) {
        this.posts.push(post);
    }

    removePost(postId) {
        this.posts = this.posts.filter((post) => post.id !== postId);
    }

    addFollower(user) {
        this.followers.push(user);
    }
    
    removeFollower(user) {
        this.followers = this.followers.filter((follower) => follower !== user);
    }
  }

  //directMessage class

  class directMessage {
    constructor(sender, recipient, text) {
        this.id = generateUniqueId();
        this.sender = sender;
        this.recipient = recipient;
        this.text = text;
        this.timestamp = new Date();
    }
  }

  class notification {
    constructor(sender, message) {
        this.id = generateUniqueId();
        this.sender = sender;
        this.message = message;
        this.timestamp = new Date();
    }
  }

// help function to generate a unique id

function generateUniqueId() {
    return Math.random().toString(36).substr(2, 9);
}








