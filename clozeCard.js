module.exports = ClozeCard;

function ClozeCard (fullText, deletion) {
    this.fullText = fullText;
    this.deletion = deletion;
    this.partialText = "";
    this.clozeDeletion = function() {	
		var textArray = this.fullText.split(" ");
		for (var i = 0; i < textArray.length; i++){
			if (this.deletion === textArray[i].toLowerCase()) {
				textArray[i] = "____";
			}
            this.partialText = this.partialText + " " + textArray[i];
        }
    }
};