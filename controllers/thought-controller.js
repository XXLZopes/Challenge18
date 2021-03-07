const { Thoughts, User, Reactions } = require('../models');

const thoughtController = {
    addThought({ params, body }, res) {
        console.log(body);
        Thoughts.create(body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                { _id: params.id },
                { $push: { thoughts: _id } },
                { new: true }
            );
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with that id.' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },

    addReaction({ params, body }, res) {
        Thoughts.findOneAndUpdate(
            { _id: params.id },
            { $push: { reactions: body } },
            { new: true }
        )
        .select('-_id')
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No thought with that id found.' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
        
    },
    deleteThought({ params }, res){
        Thoughts.findOneAndDelete(
            {_id: params.thoughtId},
        )
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
                return res.status(404).json({ message: 'No thought with that id found.' });
            }
            return User.findOneAndUpdate(
                { _id: params.userId},
                {$pull: {thoughts: params.thoughtId } },
                {new: true}

            )
        })
            .then((dbUserData) => {
                if (!dbUserData) {
                    return res.status(404).json({ message: 'No user with that id found.' });
                }
                res.json(dbUserData);
            })
        
        .catch(err => res.json(err));
    },



    deleteReaction({ params }, res){
        Thoughts.findOneAndUpdate(
            { _id: params.thoughtId},
            { $pull: { reactions: { reactionId: params.reactionId } } },
            //shows us the update on the side of insomnia (like console.log)
            { new: true }
        )
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => res.json(err));
    }
};

module.exports = thoughtController;