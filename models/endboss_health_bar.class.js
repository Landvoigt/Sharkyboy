class EndbossHealthBar extends MovableObject {
    width = 250;
    height = 18;
    borderColor = "black";
    gradientStartColor = "#ff0000";
    gradientEndColor = "#8b0000";
    backgroundColor = "#330000";

    /**
     * @param {Object} endboss - The end boss object.
     */
    constructor(endboss) {
        super();
        this.endboss = endboss;
        this.maxHealth = endbossHealthPoints;
    }


    /**
     * Draws the health bar and health points of the end boss.
     */
    draw(ctx) {
        if (endbossSpawned) {
            this.setCoordinates();
            this.drawBackground(ctx);
            this.drawHealth(ctx);
            this.drawText(ctx);
        }
    }


    /**
     * Sets the coordinates for the health bar based on the end boss position.
     */
    setCoordinates() {
        this.x = this.endboss.x + 280;
        this.y = this.endboss.y + 320;
    }


    /**
     * Draws the background of the health bar.
     */
    drawBackground(ctx) {
        ctx.fillStyle = this.backgroundColor;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }


    /**
     * Draws the health gradient and border.
     */
    drawHealth(ctx) {
        const healthPercentage = endbossHealthPoints / this.maxHealth;

        // Gradient Fill
        const gradient = ctx.createLinearGradient(this.x, this.y, this.x + this.width, this.y);
        gradient.addColorStop(0, this.gradientStartColor);
        gradient.addColorStop(1, this.gradientEndColor);
        ctx.fillStyle = gradient;
        ctx.fillRect(this.x, this.y, this.width * healthPercentage, this.height);

        // Health Bar Border
        ctx.strokeStyle = this.borderColor;
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }


    /**
     * Draws the health points text with shadow and border.
     */
    drawText(ctx) {
        ctx.font = "40px dyna";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";

        // Text Shadow
        ctx.shadowColor = "black";
        ctx.shadowBlur = 4;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;

        const textPositionY = this.y - 12;
        const text = endbossHealthPoints.toString();

        ctx.fillText(text, this.x + this.width / 2, textPositionY);

        // Reset shadow
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;

        // Text border/stroke
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 1;
        ctx.strokeText(text, this.x + this.width / 2, textPositionY);
    }
}