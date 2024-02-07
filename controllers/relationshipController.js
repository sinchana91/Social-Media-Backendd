const User = require("../models/User");

const updateFollowingList = async (req, res) => {
    if (req.body.type === "follow") {
        await follow(req, res);
    } else if (req.body.type === "unfollow") {
        await unfollow(req, res);
    }
};

const follow = async (req, res) => {
    try {
        const followingId = req.body.followingId;
        const username = req.params.username;

        const user = await User.findOne({ username: username });
        const userId = user._id;

        if (userId === followingId) {
            return res.status(400).json({ message: "You cannot follow yourself" });
        }

        const existingRelationship = await User.findOne({ username: username, following: followingId });

        if (existingRelationship) {
            if (existingRelationship.following.statusbar === "accepted") {
                return res.status(400).json({ message: "You are already following this user" });
            } else if (existingRelationship.following.statusbar === "pending") {
                return res.status(400).json({ message: "You have already sent a follow request to this user" });
            }
        } else {
            const other = await User.findOne({ _id: followingId });

            if (!other) {
                return res.status(400).json({ message: "User to follow does not exist" });
            }

            other.follower.push({
                _id: userId,
                statusbar: "pending",
            });

            user.following.push({
                _id: followingId,
                statusbar: "pending",
            });

            await user.save();

            return res.status(200).json({ message: "Follow request sent successfully" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const unfollow = async (req, res) => {
    try {
        const followingId = req.body.followingId;
        const username = req.params.username;

        const user = await User.findOne({ username: username });
        const userId = user._id;

        if (userId.toString() === followingId) {
            return res.status(400).json({ message: "You cannot unfollow yourself" });
        }

        const existingRelationship = user.following.find(
            (follow) => follow._id.toString() === followingId && follow.statusbar === "accepted"
        );

        if (existingRelationship) {
            const other = await User.findOne({ _id: followingId });

            if (!other) {
                return res.status(400).json({ message: "User to unfollow does not exist" });
            }

            other.follower = other.follower.filter((follower) => follower._id.toString() !== userId.toString());
            await other.save();

            existingRelationship.statusbar = "rejected";
            await user.save();

            return res.status(200).json({ message: "Unfollowed successfully" });
        } else {
            return res.status(400).json({ message: "You are not following this user" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const acceptrequest = async (req, res) => {
    try {
        const requestId = req.body.followerId;
        const username = req.params.username;

        const user = await User.findOne({ username: username });

        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }

        const userId = user._id;

        if (userId === requestId) {
            return res.status(400).json({ message: "You cannot follow yourself" });
        }

        const existingRelationship = await User.findOne({ username: username, follower: requestId });

        if (!existingRelationship) {
            return res.status(400).json({ message: "Relationship not found" });
        }

        if (existingRelationship.statusbar === "accepted") {
            return res.status(400).json({ message: "You are already following this user" });
        } else {
            const other = await User.findOne({ _id: requestId });

            if (!other) {
                return res.status(400).json({ message: "User does not exist" });
            }

            other.following.statusbar = "accepted";
            await other.save();

            existingRelationship.follower.statusbar = "accepted";
            await existingRelationship.save();

            return res.status(200).json({ message: "Follow request accepted successfully" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const getFollowers = async (req, res) => {
    try {
        const username = req.params.username;
        const followers = await User.find({ username: username }).populate("follower");
        return res.status(200).json(followers);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};

const getFollowing = async (req, res) => {
    try {
        const username = req.params.username;
        const followings = await User.find({ username: username }).populate("following");
        return res.status(200).json(followings);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};

const rejectedrequest = async (req, res) => {
    try {
        const followerId = req.body.followerId;
        const username = req.params.username;

        const user = await User.findOne({ username: username });

        const userId = user._id;

        if (userId === followerId) {
            return res.status(400).json({ message: "You cannot follow yourself" });
        }

        const existingRelationship = await User.findOne({ username: username, follower: followerId }).$where("this.status==='pending'");

        if (!existingRelationship) {
            return res.status(400).json({ message: "Relationship not found" });
        }

        if (existingRelationship.status === "rejected") {
            return res.status(400).json({ message: "You have already rejected this user" });
        } else {
            existingRelationship.status = "rejected";
            await existingRelationship.save();
            return res.status(200).json({ message: "Follow request rejected successfully" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    follow,
    unfollow,
    getFollowers,
    getFollowing,
    updateFollowingList,
    acceptrequest,
    rejectedrequest,
};
