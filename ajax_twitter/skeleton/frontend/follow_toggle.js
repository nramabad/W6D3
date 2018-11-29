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
  }
  
  handleClick(e) {
    // debugger
    let follow;
    e.preventDefault();
    if (this.followState) {
      follow = APIUtil.unfollowUser(this.userID);
      this.$el.attr("disabled", true);
      console.log(follow)
    } else {
      follow = APIUtil.followUser(this.userID);
      this.$el.attr("disabled", true);
    }
    // console.log(follow.prop("status"));
    follow.then( (res) => {
      this.followState = !this.followState;
      this.render();
      this.$el.attr("disabled", false);
    });
  }
}

module.exports = FollowToggle;