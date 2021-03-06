isOwner = function(charId, userId) {
	userId = userId || Meteor.userId();
	var char = Characters.findOne(charId, {fields: {owner: 1}});
	if (!char) return true;
	return (userId === char.owner);
};

canEditCharacter = function(charId, userId){
	userId = userId || Meteor.userId();
	var char = Characters.findOne(charId, {fields: {owner: 1, writers: 1}});
	if (!char) return true;
	return (userId === char.owner || _.contains(char.writers, userId));
};

canViewCharacter = function(char, userId){
	userId = userId || Meteor.userId();
	if (typeof char !== 'object'){
		char = Characters.findOne(
			char,
			{fields: {owner: 1, writers: 1, readers: 1, "settings.viewPermission": 1}}
		);
	}
	if (!char) return true;
	return userId === char.owner ||
		char.settings.viewPermission === "public" ||
		_.contains(char.writers, userId) ||
		_.contains(char.readers, userId);
};
