document.addEventListener('DOMContentLoaded', () => {
    const bioModal = document.getElementById('bioModal');
    const taglineInput = document.getElementById('taglineInput');
    const userTagline = document.getElementById('user-tagline');
    const userHashtags = document.getElementById('user-hashtags');
    const userHobbies = document.getElementById('user-hobbies');
    const userInterests = document.getElementById('user-interests');
    const hobbiesLabels = document.getElementById('hobbies-labels');
    const interestsLabels = document.getElementById('interests-labels');
    const saveHobbiesBtn = document.getElementById('saveHobbiesBtn');
    const resetHobbiesBtn = document.getElementById('resetHobbiesBtn');
    const saveInterestsBtn = document.getElementById('saveInterestsBtn');
    const resetInterestsBtn = document.getElementById('resetInterestsBtn');
    const editHobbiesBtn = document.getElementById('editHobbiesBtn');
    const editInterestsBtn = document.getElementById('editInterestsBtn');
    const changePasswordButton = document.querySelector(".change-password-btn");
    const logoutButton = document.getElementById("logoutButton");

    window.openBioModal = function() {
        taglineInput.value = userTagline.innerText;
        bioModal.style.display = 'block';
    };

    window.closeBioModal = function() {
        bioModal.style.display = 'none';
    };

    window.saveBio = function() {
        if (taglineInput.value.trim() !== "") {
            userTagline.innerText = taglineInput.value;
            localStorage.setItem("userTagline", taglineInput.value);
            closeBioModal();
        }
    };

    window.toggleHashtag = function(element, hashtag) {
        element.classList.toggle('selected');
        let currentHashtags = userHashtags.innerText.split(' ');
        if (currentHashtags.includes('#YourHashtagsWillAppearHere')) {
            currentHashtags = [];
        }
        if (currentHashtags.includes(hashtag)) {
            const index = currentHashtags.indexOf(hashtag);
            currentHashtags.splice(index, 1);
        } else {
            currentHashtags.push(hashtag);
        }
        userHashtags.innerText = currentHashtags.join(' ');
        localStorage.setItem("userHashtags", currentHashtags.join(' '));
    };

    window.resetTagline = function() {
        taglineInput.value = '';
        userTagline.innerText = '';
        localStorage.setItem("userTagline", '');
        closeBioModal();
    };

    window.editHobbies = function() {
        hobbiesLabels.style.display = 'block';
        saveHobbiesBtn.style.display = 'inline-block';
        resetHobbiesBtn.style.display = 'inline-block';
        editHobbiesBtn.style.display = 'none';
    };

    window.saveHobbies = function() {
        const selectedHobbies = [];
        hobbiesLabels.querySelectorAll('.label.selected').forEach(label => {
            selectedHobbies.push(label.innerText);
        });
        localStorage.setItem("userHobbies", JSON.stringify(selectedHobbies));
        userHobbies.innerText = selectedHobbies.join(', ');
        hobbiesLabels.style.display = 'none';
        saveHobbiesBtn.style.display = 'none';
        resetHobbiesBtn.style.display = 'none';
        editHobbiesBtn.style.display = 'inline-block';
    };

    window.resetHobbies = function() {
        hobbiesLabels.querySelectorAll('.label.selected').forEach(label => {
            label.classList.remove('selected');
        });
        userHobbies.innerText = '';
        localStorage.setItem("userHobbies", '');
        hobbiesLabels.style.display = 'none';
        saveHobbiesBtn.style.display = 'none';
        resetHobbiesBtn.style.display = 'none';
        editHobbiesBtn.style.display = 'inline-block';
    };

    window.editInterests = function() {
        interestsLabels.style.display = 'block';
        saveInterestsBtn.style.display = 'inline-block';
        resetInterestsBtn.style.display = 'inline-block';
        editInterestsBtn.style.display = 'none';
    };

    window.saveInterests = function() {
        const selectedInterests = [];
        interestsLabels.querySelectorAll('.label.selected').forEach(label => {
            selectedInterests.push(label.innerText);
        });
        localStorage.setItem("userInterests", JSON.stringify(selectedInterests));
        userInterests.innerText = selectedInterests.join(', ');
        interestsLabels.style.display = 'none';
        saveInterestsBtn.style.display = 'none';
        resetInterestsBtn.style.display = 'none';
        editInterestsBtn.style.display = 'inline-block';
    };

    window.resetInterests = function() {
        interestsLabels.querySelectorAll('.label.selected').forEach(label => {
            label.classList.remove('selected');
        });
        userInterests.innerText = '';
        localStorage.setItem("userInterests", '');
        interestsLabels.style.display = 'none';
        saveInterestsBtn.style.display = 'none';
        resetInterestsBtn.style.display = 'none';
        editInterestsBtn.style.display = 'inline-block';
    };

    window.toggleHobby = function(label) {
        label.classList.toggle('selected');
    };

    window.toggleInterest = function(label) {
        label.classList.toggle('selected');
    };

    function loadProfileData() {
        const savedTagline = localStorage.getItem("userTagline");
        const savedHashtags = localStorage.getItem("userHashtags");
        const savedHobbies = JSON.parse(localStorage.getItem("userHobbies")) || [];
        const savedInterests = JSON.parse(localStorage.getItem("userInterests")) || [];

        if (savedTagline) {
            userTagline.innerText = savedTagline;
        }

        if (savedHashtags) {
            userHashtags.innerText = savedHashtags;
        }

        userHobbies.innerText = savedHobbies.join(', ');
        userInterests.innerText = savedInterests.join(', ');

        hobbiesLabels.querySelectorAll('.label').forEach(label => {
            if (savedHobbies.includes(label.innerText)) {
                label.classList.add('selected');
            }
        });

        interestsLabels.querySelectorAll('.label').forEach(label => {
            if (savedInterests.includes(label.innerText)) {
                label.classList.add('selected');
            }
        });
    }

    function safeExecute(fn) {
        return function() {
            if (typeof fn === 'function') {
                fn.apply(this, arguments);
            } else {
                console.error(`Function ${fn.name} is not defined.`);
            }
        };
    }

    if (changePasswordButton) {
        changePasswordButton.addEventListener("click", safeExecute(changePassword));
    }
    if (logoutButton) {
        logoutButton.addEventListener("click", safeExecute(logout));
    }

    function changePassword() {
        alert("Change password functionality to be implemented.");
    }

    function logout() {
        alert("Logout functionality to be implemented.");
    }

    // Close the modal when clicking outside of it
    window.onclick = function(event) {
        if (event.target == bioModal) {
            closeBioModal();
        }
    };

    loadProfileData();
});