document.addEventListener('DOMContentLoaded', function() {
    const typingElement = document.getElementById('typing');
    if (typingElement) {
        const textArray = [
            "npm start",
            "python manage.py runserver",
            "git commit -m \"Initial commit\"",
            "Welcome to my personal terminal."
        ];
        let textArrayIndex = 0;
        let charIndex = 0;

        function type() {
            if (charIndex < textArray[textArrayIndex].length) {
                typingElement.textContent += textArray[textArrayIndex].charAt(charIndex);
                charIndex++;
                setTimeout(type, 100);
            } else {
                setTimeout(erase, 2000);
            }
        }

        function erase() {
            if (charIndex > 0) {
                typingElement.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
                charIndex--;
                setTimeout(erase, 50);
            } else {
                textArrayIndex++;
                if (textArrayIndex >= textArray.length) {
                    textArrayIndex = 0;
                }
                setTimeout(type, 500);
            }
        }

        type();
    }
});