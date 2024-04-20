document.addEventListener('DOMContentLoaded', function () {
    const reviewContainer = document.getElementById('review-container');

    // Retrieve user's answers and correct answers from localStorage
    const userAnswers = JSON.parse(localStorage.getItem('userAnswers')) || [];
    const correctAnswers = questions.map(question => ({
        number: question.answer,
        text: question['choice' + question.answer]
    }));

    // Function to create a review item for each question
    function createReviewItem(questionIndex) {
        const reviewItem = document.createElement('div');
        reviewItem.classList.add('review-item');

        const question = document.createElement('p');
        question.textContent = questions[questionIndex].question;
        reviewItem.appendChild(question);

        const userSelectedAnswer = userAnswers[questionIndex];
        const correctAnswer = correctAnswers[questionIndex].number;

        const userAnswer = document.createElement('p');
        userAnswer.textContent = userSelectedAnswer ? `Your Answer: Option ${userSelectedAnswer}: ${questions[questionIndex]['choice' + userSelectedAnswer]}` : 'You did not answer this question.';
        userAnswer.classList.add('user-answer');

        // Apply color based on correctness of the answer
        if (userSelectedAnswer === correctAnswer) {
            userAnswer.style.color = 'green'; // Correct answer
        } else {
            userAnswer.style.color = 'red'; // Incorrect answer
        }

        reviewItem.appendChild(userAnswer);

        const correctAnswerElement = document.createElement('p');
        correctAnswerElement.textContent = `Correct Answer: Option ${correctAnswers[questionIndex].number}: ${correctAnswers[questionIndex].text}`;
        correctAnswerElement.classList.add('correct-answer');
        reviewItem.appendChild(correctAnswerElement);

        return reviewItem;
    }

    // Function to render the review items
    function renderReview() {
        reviewContainer.innerHTML = ''; // Clear previous content

        // Create and append review items for each question
        for (let i = 0; i < questions.length; i++) {
            const reviewItem = createReviewItem(i);
            reviewContainer.appendChild(reviewItem);
        }
    }

    // Render the review when the page loads
    renderReview();

    console.log("User Answers:", userAnswers);
console.log("Correct Answers:", correctAnswers);

});
