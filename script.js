document.addEventListener('DOMContentLoaded', function() {
    const scoreButton = document.getElementById('scoreButton');
    let penguinScore = 0;
    let personScore = 0; // Declaration of personScore
    let clickCount = 0; // Declaration of clickCount

    const penguin = document.getElementById('penguin');
    const person = document.getElementById('person');

    let penguinPosition = 50; // Initial position percentage (50% from the left)
    let personPosition = 50; // Initial position percentage for person

    // Update the score display
    function updateScore() {
        scoreButton.textContent = 'Score of TUX - ' + penguinScore;
    }
    // Move the penguin left
    function moveLeft() {
        penguinPosition -= 10; // Adjust the value to control the movement speed
        if (penguinPosition < 0) {
            penguinPosition = 0;
        }
        updatePenguinPosition();
        updatePersonPosition(); // Update person position when penguin moves
    }

    // Move the penguin right
    function moveRight() {
        penguinPosition += 10; // Adjust the value to control the movement speed
        if (penguinPosition > 100) {
            penguinPosition = 100;
        }
        updatePenguinPosition();
        updatePersonPosition(); // Update person position when penguin moves
    }

    // Update the penguin's position
    function updatePenguinPosition() {
        penguin.style.left = penguinPosition + '%';
    }

    // Update the person's position
    function updatePersonPosition() {
        // Adjust the person's position based on the penguin's position
        person.style.left = (penguinPosition - 20) + '%';
    }

    // Check collision between penguin and person
    function checkCollision() {
        const penguinRect = penguin.getBoundingClientRect();
        const personRect = person.getBoundingClientRect();

        return !(
            penguinRect.bottom < personRect.top ||
            penguinRect.top > personRect.bottom ||
            penguinRect.right < personRect.left ||
            penguinRect.left > personRect.right
        );
    }

    // Check for collision and update score if collided
    function checkCollisionAndUpdateScore() {
        if (checkCollision()) {
            penguinScore++;
            updateScore();
        }
    }

    // Jump and beat when the user clicks on the penguin
    penguin.addEventListener('click', function() {
        jump(penguin);
        checkCollisionAndUpdateScore();
    });

    // Check for arrow key presses to move the penguin
    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowLeft') {
            moveLeft();
        } else if (event.key === 'ArrowRight') {
            moveRight();
        }
    });

    // Jump function
    function jump(element) {
        const jumpHeight = 200; // Jump height
        const jumpDuration = 500; // Jump duration in milliseconds
        const startTime = Date.now();

        function animateJump() {
            const elapsedTime = Date.now() - startTime;

            if (elapsedTime < jumpDuration) {
                const yOffset = Math.sin((elapsedTime / jumpDuration) * Math.PI) * jumpHeight;
                element.style.bottom = yOffset + 'px';

                requestAnimationFrame(animateJump);
            } else {
                element.style.bottom = '0';
                // Check collision with person after the jump
                checkCollisionAndIncrementScore();
            }
        }

        requestAnimationFrame(animateJump);
    }

    // Check collision between penguin and person and increment score
    function checkCollisionAndIncrementScore() {
        const penguinRect = penguin.getBoundingClientRect();
        const personRect = person.getBoundingClientRect();

        if (
            penguinRect.bottom >= personRect.top &&
            penguinRect.top <= personRect.bottom &&
            penguinRect.right >= personRect.left &&
            penguinRect.left <= personRect.right
        ) {
            incrementScore();
        }
    }

    // Increment score function
    function incrementScore() {
        penguinScore++;
        updateScore();
    }

    // Update the score display
    function updateScore() {
        scoreButton.textContent = 'Score: ' + penguinScore;
    }

    // Add click event listener to the person
    person.addEventListener('click', handleClick);

    // Function to handle the click on the person
    function handleClick() {
        // Increment click count
        clickCount++;
    
        // Change the image source after 3 clicks
        if (clickCount === 3) {
            
            person.style.backgroundImage = 'dead.gif';
            // Remove the click event listener after 3 clicks
    
            person.style.display = 'none';

        }
    }

    // Check for arrow key presses to make the penguin jump
    document.addEventListener('keydown', function(event) {
        if (event.key === ' ') { // Space bar key
            jump(penguin);
        }
    });
});
