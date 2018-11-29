const APIUtil = require("./api_util.js");

class FollowToggle {
  constructor($el) {
    this.$el = $el;
    this.userID = $el.data("user-id");
    this.followState = $el.data("initial-follow-state");
    this.render();
    $el.on('click', this.handleClick.bind(this));
    
  }
  
  render() {
    this.$el.html(this.followState ? "Unfollow!" : "Follow!");
    // this.$el.attr("disabled");
  }
  
  handleClick(e) {
    // debugger
    let follow;
    e.preventDefault();
    if (this.followState) {
      follow = APIUtil.unfollowUser(this.userID);
    } else {
      follow = APIUtil.followUser(this.userID);
    }
    // console.log(follow.prop("status"));
    follow.then( (res) => {
      this.followState = !this.followState;
      this.render();
    });
    // let action =  this.followState ? 'DELETE' : 'POST';
    // $.ajax ({
    //   method: action,
    //   url: `/users/${this.userID}/follow`,
    //   dataType: 'JSON'
    // }).then( (res) => {
    //   this.followState = !this.followState;
    //   this.render();
    // });
  }
}

module.exports = FollowToggle;