module.exports = BasicCard;

function BasicCard (front, back) {
    this.front = front;
    this.back = back;
    this.full = "Front: " + front + " Back: " + back;
}